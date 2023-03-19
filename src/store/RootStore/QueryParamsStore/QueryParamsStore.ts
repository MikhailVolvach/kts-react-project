import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_params";

export default class QueryParamsStore implements ILocalStore {
    private _params: qs.ParsedQs = {};
    private _search = "";

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            page: computed,
            search: computed,
            type: computed,
            params: computed,
            setParams: action,
        });
    }

    get search() {
        return this._params.search || "";
    }

    get page() {
        return this._params.page || 1;
    }

    get type() {
        return this._params.type || "";
    }

    setParams(param: string) {
        param = param.startsWith("?") ? param.slice(1) : param;

        if (this._search !== param) {
            this._params = qs.parse(param);
            this._search = param;
        }
    }

    get params() {
        return this._params;
    }

    destroy(): void {}
}
