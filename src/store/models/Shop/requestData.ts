export type RequestDataApi = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
};

export type RequestDataModel = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
};

export const normalizerRequestData = (
  from: RequestDataApi
): RequestDataModel => ({
  id: from.id,
  image: from.image,
  category: from.category,
  title: from.title,
  description: from.description,
  price: from.price,
});
