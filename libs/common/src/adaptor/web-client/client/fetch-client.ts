import {
  type IWebClient,
  type IWebClientReply,
  type IWebClientReq,
} from '#common/adaptor/web-client/client/web-client.type';
import { CE_CONTENT_TYPE } from '#common/adaptor/web-client/const-enum/CE_CONTENT_TYPE';
import { CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import { type TValueOf } from '#common/shared/dto/utility.type';
import isEmpty, { isNotEmpty } from '#common/shared/tool/isEmpty';
import getHttpMethod from '#framework/logger/getHttpMethod';
import { type LoggerService } from '#framework/logger/logger.service';
import { HttpException } from '@nestjs/common';

export class FetchClient implements IWebClient {
  /** 요청 정보 */
  private req: IWebClientReq;
  private reply: IWebClientReply;

  private loggerService?: LoggerService;

  constructor(args: { url?: string }) {
    this.req = {
      url: args.url ?? '',
      method: 'GET',
      contentType: CE_CONTENT_TYPE.APPLICATION_JSON,
      headers: undefined,
      query: undefined,
      body: undefined,
    };
    this.reply = {};
  }

  async retrieve<TData = unknown>(): Promise<{
    status: number;
    data: TData;
  }> {
    this.loggerService?.webClientRequest({ req: this.req });

    try {
      const fetched = await fetch(this.reqUrl(), this.reqRequestInit());
      const data = await this.replyBody<TData>(fetched);

      this.reply.response = fetched;
      this.reply.data = data;

      if (fetched.ok === false) {
        throw new HttpException({ errorCode: CE_ERROR_CODE.COMMON.WEB_CLIENT_ERROR }, fetched.status);
      }

      this.loggerService?.webClientResponse({ req: this.req, reply: { response: fetched, data } });

      return { status: fetched.status, data };
    } catch (catched) {
      const err = catched instanceof Error || catched instanceof HttpException ? catched : new Error(`${catched}`);
      this.loggerService?.webClientError({
        req: this.req,
        reply: this.reply ?? undefined,
        err,
      });

      throw err;
    }
  }

  //SECTION - Setter
  url(url: string): this {
    this.req.url = url;
    return this;
  }

  header(headers: Record<string, string>): this {
    this.req.headers = headers;
    return this;
  }

  query(query: NonNullable<IWebClientReq['query']>): this {
    this.req.query = query;
    return this;
  }

  body(body: unknown): this {
    this.req.body = body;

    return this;
  }

  contentType(contentType: CE_CONTENT_TYPE): this {
    this.req.contentType = contentType;

    return this;
  }

  setLogger(loggerService: LoggerService): this {
    this.loggerService = loggerService;
    return this;
  }
  // !SECTION

  // SECTION - Request Data
  private buildQueryString(
    key: string,
    value: TValueOf<NonNullable<IWebClientReq['query']>>,
    parentKey?: string,
  ): string[] {
    const encodedKey = parentKey
      ? `${encodeURIComponent(parentKey)}[${encodeURIComponent(key)}]`
      : encodeURIComponent(key);

    if (isEmpty(value)) {
      // undefined 또는 null인 경우 처리하지 않음
      return [];
    }

    if (Array.isArray(value)) {
      // 배열인 경우 JSON 배열로 직렬화하여 처리
      return [`${encodedKey}=${encodeURIComponent(JSON.stringify(value))}`];
    } else if (typeof value === 'object') {
      // 객체인 경우 JSON으로 직렬화
      return [`${encodedKey}=${encodeURIComponent(JSON.stringify(value))}`];
    } else {
      // 기본 타입인 경우
      return [`${encodedKey}=${encodeURIComponent(String(value))}`];
    }
  }

  private reqQuerystring(): string {
    if (isEmpty(this.req.query)) {
      return '';
    }

    const querystring = Object.entries(this.req.query)
      .flatMap(([key, value]) => this.buildQueryString(key, value))
      .join('&');

    return querystring;
  }

  private reqUrl(): string {
    const querystring = this.reqQuerystring();

    return [this.req.url, querystring].filter((str) => isNotEmpty(str)).join('?');
  }

  private reqRequestInit(): RequestInit {
    return {
      method: this.req.method,
      headers: {
        ...this.req.headers,
        'Content-Type': this.req.contentType,
      },
      body: this.reqBody(),
    };
  }

  private reqBody(): string {
    if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_JSON) {
      return JSON.stringify(this.req.body);
    }

    if (this.req.contentType === CE_CONTENT_TYPE.TEXT_PLAIN) {
      return `${this.req.body}`;
    }

    if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_FORM_URLENCODED) {
      return new URLSearchParams(this.req.body as Record<string, string>).toString();
    }

    return JSON.stringify(this.req.body);
  }

  private replyBody<TData>(fetched: Response) {
    // NOTE: 관련 변천사
    // 1. 응답값이 없는 경우가 있다. 그래서 Content-Length을 기준으로 처리하였다.
    // 2. Content-Length가 없는데 응답값은 있는 경우도 있다, 무조건 가져오고 오류나면 빈값으로 처리하도록 변경하였다.
    try {
      if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_JSON) {
        return fetched.json() as TData;
      }

      if (this.req.contentType === CE_CONTENT_TYPE.TEXT_PLAIN) {
        return fetched.text() as TData;
      }

      if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_FORM_URLENCODED) {
        return fetched.formData() as TData;
      }

      // TODO: arrayBuffer, blob 등도 필요하면 추가

      return fetched.json() as TData;
    } catch (_catched) {
      if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_JSON) {
        return {} as TData;
      }

      if (this.req.contentType === CE_CONTENT_TYPE.TEXT_PLAIN) {
        return '' as TData;
      }

      if (this.req.contentType === CE_CONTENT_TYPE.APPLICATION_FORM_URLENCODED) {
        return new FormData() as TData;
      }

      return {} as TData;
    }
  }
  // !SECTION

  // SECTION - HTTP methods
  get(): this {
    this.req.method = 'GET';
    return this;
  }

  head(): this {
    this.req.method = 'HEAD';
    return this;
  }

  post(): this {
    this.req.method = 'POST';
    return this;
  }

  put(): this {
    this.req.method = 'PUT';
    return this;
  }

  patch(): this {
    this.req.method = 'PATCH';
    return this;
  }

  delete(): this {
    this.req.method = 'DELETE';
    return this;
  }

  options(): this {
    this.req.method = 'OPTIONS';
    return this;
  }

  method(httpMethod: string): this {
    this.req.method = getHttpMethod(httpMethod);
    return this;
  }
  // !SECTION
}
