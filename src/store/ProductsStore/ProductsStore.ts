import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@models/shared/collection";
import { normalizerRequestData, RequestDataModel } from "@models/Shop";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta";

export default class ProductsStore implements ILocalStore {
  private _list: CollectionModel<number, RequestDataModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getProductsList: action,
    });
  }

  get list(): RequestDataModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(url: string = "") {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const response = await axios.get(url);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }
      try {
        const list: RequestDataModel[] = [];
        if (Array.isArray(response.data)) {
          for (const item of response.data) {
            list.push(normalizerRequestData(item));
          }
        } else {
          list.push(normalizerRequestData(response.data));
        }
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listitem) => listitem.id);
        return;
      } catch (e) {
        log(e);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    // Nothing
  }
}
