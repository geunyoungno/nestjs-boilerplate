export const CE_LOG_DISCRIMINATOR = {
  HTTP_REQUEST: 'http_request',
  HTTP_RESPONSE: 'http_response',
} as const;

export type CE_LOG_DISCRIMINATOR = (typeof CE_LOG_DISCRIMINATOR)[keyof typeof CE_LOG_DISCRIMINATOR];
