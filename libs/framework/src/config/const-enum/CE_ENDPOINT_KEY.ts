export const CE_ENDPOINT_KEY = {
  CDN: 'cdn',
} as const;

export type CE_ENDPOINT_KEY = (typeof CE_ENDPOINT_KEY)[keyof typeof CE_ENDPOINT_KEY];
