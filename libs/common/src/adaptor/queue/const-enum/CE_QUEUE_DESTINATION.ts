/**
 * 큐 목적지 구분값
 * * AWS_S3, aws-s3: AWS S3
 * * DB, db: DB
 * * EMAIL, email: 이메일
 * * SLACK, slack: 슬랙
 */
export const CE_QUEUE_DESTINATION = {
  AWS_S3: 'aws-s3',
  DB: 'db',
  EMAIL: 'email',
  SLACK: 'slack',
} as const;

export type CE_QUEUE_DESTINATION = (typeof CE_QUEUE_DESTINATION)[keyof typeof CE_QUEUE_DESTINATION];
