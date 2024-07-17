import { ApiResponse, Data, Params } from "./types";
import setup from "./db-setup";
import { DeleteRequest } from "../types";

const { db } = setup();

export async function fetchSingleItem<T>(
  docId: string
): Promise<ApiResponse<T>> {
  // db.get(docId, null,(err, result)=>{
  //   return  { success: true, payload:result. };
  // });
  return { success: true };
}

export async function deleteItem<T>({
  docId,
  revId,
}: DeleteRequest): Promise<ApiResponse<T>> {
  const response = await db.remove(docId.toString(), revId);

  if (!response.ok) {
    throw new Error("Delete Operation failed");
  }
  return { success: true, message: 'Data deleted successfull' };
}

export async function postItem<T>(data: Data): Promise<ApiResponse<T>> {
  const response = await db.post(data);

  if (!response.ok) {
    throw new Error("Could not save data");
  }
  return { success: true, message: "data saved successfull" };
}

export async function updateItem<T>(data: Data): Promise<ApiResponse<T>> {
  const response = await db.put(data);

  if (!response.ok) {
    throw new Error("Could not update data");
  }
  return { success: true };
}

export async function fetchPaginatedItems<T>(
  params?: Params
): Promise<ApiResponse<T>> {
  await db.allDocs({});
  // if (payload.links && payload.current_page) {
  //     payload.pagination = {
  //       current_page: payload.current_page,
  //       from: payload.from,
  //       last_page: payload.last_page,
  //       per_page: payload.per_page,
  //       to: payload.to,
  //       total: payload.total,
  //       links: payload.links,
  //       first_page_url: payload.total,
  //       last_page_url: payload.total,
  //       next_page_url: payload.total,
  //       path: payload.total,
  //       prev_page_url: payload.total,
  //     };
  //   }
  return { success: true };
}

export async function fetchItemList<T>(): Promise<ApiResponse<T[]>> {
  // if(T instanceof Array){

  // }
  let records = [];
  const result = await db.allDocs({ include_docs: true });
  records = result.rows.map(
    (row) => ({ ...row.doc, id: row.id, revId: row.doc?._rev } as T)
  );
  return { success: true, payload: records };
}
