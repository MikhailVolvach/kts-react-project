import { RequestData } from "@pages/Products";
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

const BASE_URL = "https://fakestoreapi.com/products";

type PrivateFields = "_list" | "_meta";

export default class ShopStore implements ILocalStore {
  private _list: RequestData[] = [];
  private _meta: Meta = Meta.initial;
  private _url: string = "";

  constructor(url: string = "") {
    this._url = url;
    makeObservable<ShopStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getProductsList: action,
    });
  }

  get list(): RequestData[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList() {
    this._meta = Meta.loading;
    this._list = [];

    const response = await axios.get(BASE_URL + this._url);
    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._list = response.data.map((raw: RequestData) => ({
          id: raw.id,
          image: raw.image,
          category: raw.category,
          title: raw.title,
          description: raw.description,
          price: raw.price,
        }));
        return;
      }
    });

    this._meta = Meta.error;
  }

  destroy(): void {
    // Nothing
  }
}
