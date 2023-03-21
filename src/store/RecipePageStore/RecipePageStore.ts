import axios from "axios";
import { projectConfig } from "config/projectConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";
import { normalizeRecipeItem, RecipeItemApi, RecipeItemModel } from "store/models";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from "store/models/shared/collection";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_list" | "_meta" | "_numberOfItems";

export default class RecipePageStore implements ILocalStore {
    private readonly _address = projectConfig.ADDRESS;
    private _apiKeyFlag = 0;
    // private readonly _apiKey = projectConfig.API_KEY[this._apiKeyFlag];
    private _apiKey = "";
    private readonly _path: string = "";

    constructor(path: string) {
        makeObservable<RecipePageStore, PrivateFields>(this, {
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

    async getRecipeList(): Promise<void> {
        this._apiKey = projectConfig.API_KEY[this._apiKeyFlag];
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();
        this._numberOfItems = 0;

        const query = [
            {
                name: "includeNutrition",
                value: "true",
            },
        ];

        const url = this._address + "/" + this._path + "?" + qs.stringify(query) + "&apiKey=" + this._apiKey;

        const response = await axios.get(url);

        runInAction(() => {
            if (response.status !== 200) {
                this._meta = Meta.error;
            }

            try {
                const list: RecipeItemApi[] = [];
                list.push(normalizeRecipeItem(response.data));
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
                if (this._apiKeyFlag < projectConfig.API_KEY.length) {
                    this._apiKeyFlag++;
                } else {
                    this._apiKeyFlag = 0;
                }
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
