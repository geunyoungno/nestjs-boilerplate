export const CE_CUSTOM_HEADER = {
  ACCESS_TOKEN: 'access-token',
  REQUEST_ID: 'x-request-id',
} as const;

export type CE_CUSTOM_HEADER = (typeof CE_CUSTOM_HEADER)[keyof typeof CE_CUSTOM_HEADER];
