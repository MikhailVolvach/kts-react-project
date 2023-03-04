import {
  normalizeRecipeItem,
  RecipeItemApi,
  RecipeItemModel,
} from "@store/models";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { Log } from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta";

type getRecipeListParams = {
  path: string;
  queryParams: string[];
};

export default class RecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeItemModel> = {
    order: [],
    entities: {},
  };
  private _meta: Meta = Meta.initial;

  private readonly _address = "https://api.spoonacular.com/recipes";
  private readonly _apiKey = "9cf15f974d3b4aac8c3cdf47e72525ad";
  // private readonly _apiKey = "374b6b2cbf01429284a2a30b23f45f97";

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      meta: computed,
      list: computed,
      getRecipeList: action,
    });
  }

  get list(): RecipeItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipeList({
    path,
    queryParams,
  }: getRecipeListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const url =
      this._address +
      "/" +
      path +
      "?" +
      queryParams.join("&") +
      "&apiKey=" +
      this._apiKey;

    const response = await axios.get(url);

    runInAction(() => {
      if (response.status !== 200) {
        Log("Request ERROR");
        this._meta = Meta.error;
      }

      try {
        const list = [];
        if (response.data.number > 1) {
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
        Log(e);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    // this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      // Сюда попробовать запихнуть логику поиска
      Log("search value change", search);
    }
  );
}
