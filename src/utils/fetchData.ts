import { Dispatch, SetStateAction } from "react";

import { RequestData } from "@pages/Products";
import axios from "axios";

export const fetchData = async (
  url: string,
  callback: Dispatch<SetStateAction<RequestData[]>>,
  loader?: Dispatch<SetStateAction<boolean>>
) => {
  loader && loader(true);
  const { data } = await axios.get(url);

  callback(
    data.map((raw: RequestData) => ({
      id: raw.id,
      image: raw.image,
      category: raw.category,
      title: raw.title,
      subtitle: raw.description,
      price: raw.price,
    }))
  );
  loader && loader(false);
};

export default class DataStore {
  private url: string = "";
  private callback: null | Dispatch<SetStateAction<RequestData[]>> = null;

  constructor(url: string, callback: Dispatch<SetStateAction<RequestData[]>>) {
    this.url = url;
    this.callback = callback;
  }

  async fetch() {
    const { data } = await axios.get(this.url);

    this.callback?.(
      data.map((raw: RequestData) => ({
        id: raw.id,
        image: raw.image,
        category: raw.category,
        title: raw.title,
        subtitle: raw.description,
        price: raw.price,
      }))
    );
  }
}
