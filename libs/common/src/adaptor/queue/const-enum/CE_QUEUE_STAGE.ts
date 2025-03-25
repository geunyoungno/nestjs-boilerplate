/**
 * 큐 단계
 * * pre: 전처리
 * * mid: 중간처리, 기본값
 * * post: 후처리
 */
export const CE_QUEUE_STAGE = {
  PRE: 'pre',
  MID: 'mid',
  POST: 'post',
} as const;

export type CE_QUEUE_STAGE = (typeof CE_QUEUE_STAGE)[keyof typeof CE_QUEUE_STAGE];
