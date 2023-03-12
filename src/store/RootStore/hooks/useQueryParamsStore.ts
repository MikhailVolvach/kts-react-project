import QueryParamsStore from "store/RootStore/QueryParamsStore";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const stringifyParams = (queryParams: URLSearchParams) => {
  let result = "";
  queryParams.forEach((value, key, parent) => result += key + "=" + value + "&");
  return result.endsWith("&") ? result.slice(0, result.length - 1) : result;
}

const getSearchParamsForLocation = (location: string, defaultSearchParams: URLSearchParams) => {
  const searchParams = new URLSearchParams(location);

  if (defaultSearchParams) {
    for (let key of defaultSearchParams.keys()) {
      if (!searchParams.hasOwnProperty(key)) {
        defaultSearchParams.getAll(key).forEach(value => searchParams.append(key, value));
      }
    }
  }

  return searchParams;
}

export const useQueryParamsStore = (defaultParams: URLSearchParams=new URLSearchParams()): [QueryParamsStore, (queryParams: URLSearchParams) => void] => {
  const queryParamsStore = React.useMemo(() => new QueryParamsStore(), []);

  const defaultSearchParamsRef = React.useRef(new URLSearchParams(defaultParams));

  const location = useLocation();

  const searchParams = React.useMemo(() => getSearchParamsForLocation(location.search, defaultSearchParamsRef.current), [location.search]);

  queryParamsStore.setParam(stringifyParams(searchParams));

  const navigate = useNavigate();

  const setQueryParamsStore = React.useCallback((queryParams: URLSearchParams) => {
    const newSearchParams = stringifyParams(queryParams);
    queryParamsStore.setParam(newSearchParams);
    navigate("?" + newSearchParams);
  }, [navigate, searchParams]);

  return [queryParamsStore, setQueryParamsStore];
}