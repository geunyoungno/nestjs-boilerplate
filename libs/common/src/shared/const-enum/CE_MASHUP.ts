/**
 * * EXTERNAL, external: 외부 제공용 API
 * * PLATFORM, platform: 플랫폼 API
 *
 * * COMMON, common: 모든 mashup에서 사용 가능한 API
 */
export const CE_MASHUP = {
  EXTERNAL: 'external',
  PLATFORM: 'platform',

  COMMON: 'common', // 모든 mashup에서 사용 가능한 API
} as const;

export type CE_MASHUP = (typeof CE_MASHUP)[keyof typeof CE_MASHUP];
