import { type CE_LOG_DISCRIMINATOR } from '#common/const-enum/CE_LOG_DISCRIMINATOR';

export interface ILogFormat {
  discriminator: CE_LOG_DISCRIMINATOR;
  status: number;
  duration?: number;
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
    | 'DEBUG';
  req_url: string;

  // 여기는 고유 식별자
  id?: Partial<{
    /** http Request 고유 id */
    requestId: string;
  }>;
  err?: Partial<{
    message: string;
    stack: string;
    cause: string;
    line?: string;
  }>;
  payload:
    | {
        req: Partial<Record<'header' | 'query' | 'param' | 'body', unknown>>;
        res: Partial<Record<'data' | 'error' | 'header', string>>;
      } // http 시 정보
    | Record<string, unknown>; // 그 외 정보
}
