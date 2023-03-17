// TODO: Попробовать сделать так, чтобы при изменении параметра он записывался в этот стор, а уже потом, когда надо, делался запрос
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

type PrivateFields = "_list" | "_meta" | "_numberOfItems";

export default class RecipesStore implements ILocalStore {
  private readonly _address = "https://api.spoonacular.com/recipes";

  // private readonly _apiKey = "9cf15f974d3b4aac8c3cdf47e72525ad";
  // private readonly _apiKey = "374b6b2cbf01429284a2a30b23f45f97";
  private readonly _apiKey = "64bb192a08e1463b929034337dd47399";
  // private readonly _apiKey = "f0472bd4e95e46d09cf8ab093d8e0be8";
  // private readonly _apiKey = "de860f05419d43058e2ec87556ca4233";
  // private readonly _apiKey = "a8d1302245bf4f51a229a6210148e804";

  private readonly _path: string = "";

  constructor(path: string) {
    makeObservable<RecipesStore, PrivateFields>(this, {
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
      queryParams
        .filter(
          (element) =>
            element !== null &&
            element.value !== null &&
            element.value !== "" &&
            typeof element.value !== undefined
        )
        .map((element) => `${element?.name}=${element?.value}`)
        .join("&") +
      "&apiKey=" +
      this._apiKey;

    const response = await axios.get(url);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        const list = [];
        if (response.data.totalResults) {
          this._numberOfItems = response.data.totalResults;
          response.data.results.forEach((elem: RecipeItemApi) =>
            list.push(normalizeRecipeItem(elem))
          );
        } else {
          list.push(normalizeRecipeItem(response.data));
        }
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
