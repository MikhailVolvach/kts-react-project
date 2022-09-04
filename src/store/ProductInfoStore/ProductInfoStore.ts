import { ILocalStore } from "@utils/useLocalStore";

type PrivateFields = "_url" | "_list" | "_meta";

export default class ProductInfoStore implements ILocalStore {
  destroy() {
    // Nothing
  }
}
