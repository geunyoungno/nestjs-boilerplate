/**
 *
 */
export const CE_TRADE_QUEUE_NAME = {
  // 저장소 큐
  STORAGE_QUEUE: 'storage.queue',

  // 사용자 큐
  USER_QUEUE: 'user.queue',
} as const;

export type CE_TRADE_QUEUE_NAME = (typeof CE_TRADE_QUEUE_NAME)[keyof typeof CE_TRADE_QUEUE_NAME];

export type CE_QUEUE_NAME = CE_TRADE_QUEUE_NAME;
