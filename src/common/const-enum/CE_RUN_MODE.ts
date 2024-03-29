export const CE_RUN_MODE = {
  LOCAL: 'local',
  DEVELOP: 'develop',
  QA: 'qa',
  STAGE: 'stage',
  PRODUCTION: 'production',
} as const;

export type CE_RUN_MODE = (typeof CE_RUN_MODE)[keyof typeof CE_RUN_MODE];
