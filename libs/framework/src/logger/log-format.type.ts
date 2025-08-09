import { type TLiteralUnion } from '#common/shared/dto/utility.type';
import { type CE_LOG_DISCRIMINATOR } from '#framework/logger/const-enum/CE_LOG_DISCRIMINATOR';

export interface ILogFormat {
  timestamp?: string;
  discriminator: TLiteralUnion<CE_LOG_DISCRIMINATOR, string>;
  status: number;
  duration?: number;
  hostname?: string;
  req_method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH'
    | 'CONNECT'
    | 'UNKNOWN'
    // 시스템 메시지
    | 'SYS'
    | 'SYSUNKNOWN'
    // 디버그 메시지 전용
    | 'INFO'
    | 'DEBUG'
    | 'ERROR';
  req_url: string;

  // 여기는 고유 식별자
  id?: Partial<{
    /** http Request 고유 id */
    requestId: string;

    /** 사용자 UUID */
    userUuid?: string;
  }>;
  err?: Partial<{
    message: string;
    stack: string;
    cause?: unknown;
    line?: string;
  }>;
  payload:
    | {
        req: Partial<Record<'header' | 'query' | 'param' | 'body', unknown>>;
        reply: Partial<Record<'data' | 'error' | 'header', unknown>>;
      } // http 시 정보
    | Record<string, unknown>; // 그 외 정보
}
