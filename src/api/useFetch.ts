import { ApiResponse, Request } from "./types";

import {
  fetchSingleItem,
  deleteItem,
  postItem,
  fetchPaginatedItems,
  fetchItemList,
  updateItem,
} from "./db-fetch-service";

const useFetch = async <T>({
  url,
  method,
  data,
}: Request): Promise<ApiResponse<T>> => {
  // const _data = data ?? {};
  try {
    let response: ApiResponse<T | T[]>;
    if (method === "post") {
      response = await postItem(data ?? {});
    } else if (method === "delete") {
      response = await deleteItem({ docId: data.docId, revId: data.revId });
    } else if (method === "patch" || method === "put") {
      response = await updateItem(data ?? {});
    } else {
      const params = {}; //generateParams(_data);
      // response = await fetchPaginatedItems(params);
      response = await fetchItemList<T>();
    }
    const { success } = response;

    if (response.success) {
      return {
        success,
        payload: response.payload,
        message: response.message,
        success_code: response.success_code,
      };
    }
    throw new Error(response.error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const generateParams = (params: Record<string, unknown>) => {
  let data = "?";
  for (let key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          const elememts = params[key] as [];
          let arr = "";
          for (const ele of elememts) {
            arr = arr + `${key}[]=${ele}&`;
          }
          data = data + arr;
        } else {
          data = data + `${key}=${params[key]}&`;
        }
      }
    }
  }
  return data.slice(0, -1);
};

export { useFetch };
