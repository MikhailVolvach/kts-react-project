import { Dispatch, SetStateAction } from "react";

import { RequestData } from "@pages/Products";
import { log } from "@utils/log";
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
