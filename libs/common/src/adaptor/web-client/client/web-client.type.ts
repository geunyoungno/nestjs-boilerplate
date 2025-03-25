import { type CE_CONTENT_TYPE } from '#common/adaptor/web-client/const-enum/CE_CONTENT_TYPE';

export interface IWebClientReq {
  url: string;
  method: string;
  contentType: CE_CONTENT_TYPE;
  headers?: Record<string, string>;
  query?: Record<
    string,
    | string
    | number
    | boolean
    | Record<string, string | number | boolean>
    | Array<string | number | boolean | Record<string, string | number | boolean>>
  >;

  body: unknown;
}

export interface IWebClientReply {
  response?: Response;
  data?: unknown;
}

export interface IWebClient {
  retrieve<TData = unknown>(): Promise<{
    status: number;
    data: TData;
  }>;

  // SECTION - Setter
  url(url: string): this;

  header(headers: NonNullable<IWebClientReq['headers']>): this;

  query(query: NonNullable<IWebClientReq['query']>): this;

  body(body: unknown): this;

  contentType(mediaType: CE_CONTENT_TYPE): this;
  // !SECTION

  // SECTION - Request Data
  // private method 라서 주석처리함
  // reqQuerystring(): string;

  // reqUrl(): string;

  // reqRequestInit(): RequestInit;

  // reqBody(): string | null;

  // replyBody<TReplyData>(fetched: Response): Promise<TReplyData>;
  // !SECTION

  // SECTION - HTTP methods
  /** Start building an HTTP GET request */
  get(): this;

  /** Start building an HTTP HEAD request */
  head(): this;

  /** Start building an HTTP POST request */
  post(): this;

  /** Start building an HTTP PUT request */
  put(): this;

  /** Start building an HTTP PATCH request */
  patch(): this;

  /** Start building an HTTP DELETE request */
  delete(): this;

  /** Start building an HTTP OPTIONS request */
  options(): this;

  /** Start building a request for the given httpMethod */
  method(httpMethod: string): this;
  // !SECTION
}
