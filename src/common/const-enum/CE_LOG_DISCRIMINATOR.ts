export const CE_LOG_DISCRIMINATOR = {
  HTTP_REQUEST: 'http_request',
  HTTP_RESPONSE: 'http_response',
  HTTP_ERROR: 'http_error',
  COMMON_INFO: 'common_info',
  COMMON_ERROR: 'common_error',
} as const;

export type CE_LOG_DISCRIMINATOR = (typeof CE_LOG_DISCRIMINATOR)[keyof typeof CE_LOG_DISCRIMINATOR];
