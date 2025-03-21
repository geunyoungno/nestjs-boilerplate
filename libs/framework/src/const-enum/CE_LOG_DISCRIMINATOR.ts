export const CE_LOG_DISCRIMINATOR = {
  // 공통
  COMMON_ERROR: 'common_error',
  COMMON_INFO: 'common_info',

  // HTTP 요청
  HTTP_ERROR: 'http_error',
  HTTP_REQUEST: 'http_request',
  HTTP_RESPONSE: 'http_response',

  // Queue
  QUEUE_CONSUMER_ACTIVE: 'queue_consumer_active',
  QUEUE_CONSUMER_COMPLETED: 'queue_consumer_completed',
  QUEUE_CONSUMER_ERROR: 'queue_consumer_error',
  QUEUE_CONSUMER_FAILED: 'queue_consumer_failed',
  QUEUE_PRODUCER_ADDED: 'queue_producer_added',
  QUEUE_PRODUCER_ERROR: 'queue_producer_error',

  // TypeORM
  TYPEORM_ERROR: 'typeorm_error',
  TYPEORM_INFO: 'typeorm_info',

  // Web Client
  WEB_CLIENT_ERROR: 'web_client_error',
  WEB_CLIENT_REQUEST: 'web_client_request',
  WEB_CLIENT_RESPONSE: 'web_client_response',
} as const;

export type CE_LOG_DISCRIMINATOR = (typeof CE_LOG_DISCRIMINATOR)[keyof typeof CE_LOG_DISCRIMINATOR];
