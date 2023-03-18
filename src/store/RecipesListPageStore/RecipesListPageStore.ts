import {
  normalizeRecipeItem,
  RecipeItemApi,
  RecipeItemModel,
} from "store/models";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import axios from "axios";
import { queryParamType } from "utils/types";
import {projectConfig} from "config/projectConfig";
import qs from "qs";

type PrivateFields = "_list" | "_meta" | "_numberOfItems";

export default class RecipesListPageStore implements ILocalStore {
  private readonly _address = projectConfig.ADDRESS;
  private readonly _apiKey = projectConfig.API_KEY;

  private readonly _path: string = "";

  constructor(path: string) {
    makeObservable<RecipesListPageStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _numberOfItems: observable,
      list: computed,
      meta: computed,
      numberOfItems: computed,
      getRecipeList: action.bound,
    });

    if (path !== this._path) {
      this._path = path;
    }
  }

  private _list: CollectionModel<number, RecipeItemModel> = {
    order: [],
    entities: {},
  };
  private _meta: Meta = Meta.initial;
  private _numberOfItems = 0;

  async getRecipeList(
    queryParams: (queryParamType | null)[] = []
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._numberOfItems = 0;

    const url =
      this._address +
      "/" +
      this._path +
      "?" +
      qs.stringify(queryParams) +
      "&apiKey=" +
      this._apiKey;

    const response = await axios.get(url);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        const list = [];
        list.push(normalizeRecipeItem(response.data));
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  get list(): RecipeItemModel[] {
    return linearizeCollection(this._list);
  }
  get meta(): Meta {
    return this._meta;
  }

  get numberOfItems(): number {
    return this._numberOfItems;
  }

  destroy(): void {}
}