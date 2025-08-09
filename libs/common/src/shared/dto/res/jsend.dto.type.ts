import { type CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import { type TLiteralUnion, type TValueOf } from '#common/shared/dto/utility.type';
import { type HttpStatus } from '@nestjs/common';

/** @see https://seller-note.atlassian.net/wiki/spaces/TRADEDEV/pages/196938/REST+API+Response+Format */
/** 성공 Jsend DTO */
export interface ISuccessJsendDto<TData = unknown> {
  /**
   * http status code
   * * 200, 201 등
   */
  statusCode: HttpStatus;

  /**
   * 전달 data
   */
  data?: TData;
}

/** 실패 Jsend DTO */
export interface IFailureJsendDto<TData = unknown> {
  /**
   * http status code
   * * 400, 401, 404 등
   */
  statusCode: HttpStatus;

  /**
   * error 정보
   */
  error: {
    /** error code */
    code: TLiteralUnion<TValueOf<TValueOf<typeof CE_ERROR_CODE>>, string>;
    /** error detail */
    errors?: TData;
    /** error message */
    message?: string;
  };
}
