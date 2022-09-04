import { Dispatch, SetStateAction } from "react";

import { RequestData } from "@pages/Products";
import DataStore from "@utils/fetchData";

export default class FetchData {
  url: string = "";
  data: RequestData[] = [];
  callback: null | Dispatch<SetStateAction<RequestData[]>> = null;

  constructor(url: string, callback: Dispatch<SetStateAction<RequestData[]>>) {
    this.url = url;
    this.callback = callback;
  }

  // @ts-ignore
  private readonly _dataStore = new DataStore(this.url, this.callback);

  fetch() {
    this._dataStore?.fetch();
  }

  // fetch = fetchData(this.url, this.callback, this.loader);
}
