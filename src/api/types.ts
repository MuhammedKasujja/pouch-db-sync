export type DeleteRequest = {
  docId: string;
  revId: string;
};

interface SuccessApiResponse<T> {
  success: true;
  message?: string;
  payload?: T;
  success_code?: number;
}

interface FailueApiResponse {
  success: false;
  error?: string;
  error_code?: number;
}

export type ApiResponse<T> = SuccessApiResponse<T> | FailueApiResponse;

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface Paginated<D extends Record<string, unknown>>
  extends Pagination {
  data: D[];
  // pagination: AtLeastOne<Pagination<D>>;
  pagination: Pagination;
}

// export type Pagination<T> = Omit<Paginated<T>, "data" | "links" | "pagination">;

export type Pagination = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
  links: Link[];
};

// export type ApiMethod = "get" | "post" | "delete" | "patch" | "put";

export type Params = { [key: string]: unknown };

export type Data = { [key: string]: unknown };

export type GetRequest = {
  url: string;
  method: "get";
  data?: Params;
};

export type PostRequest = {
  url: string;
  method: "post";
  data: Data;
};

export type DeleteRequestType = {
  url: string;
  method: "delete";
  data: DeleteRequest;
};

export type PutRequestType = {
  url: string;
  method: "put" | "patch";
  data?: Data;
};

export type Request =
  | GetRequest
  | PostRequest
  | DeleteRequestType
  | PutRequestType;
