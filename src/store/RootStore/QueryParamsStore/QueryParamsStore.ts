import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {

  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _page: string = "1";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      getSearch: action,
      getPage: action,
      setParam: action,
    });
  }

  getSearch() {
    return this._params.search;
  }

  getPage() {
    return this._params.page || this._page;
  }

  setParam(param: string) {
    param = param.startsWith("?") ? param.slice(1) : param;

    if (this._search !== param) {
      this._params = qs.parse(param);
      this._search = param;
    }
  }
}
