export const CE_CONTENT_TYPE = {
  APPLICATION_JSON: 'application/json',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  TEXT_PLAIN: 'text/plain',
} as const;

export type CE_CONTENT_TYPE = (typeof CE_CONTENT_TYPE)[keyof typeof CE_CONTENT_TYPE];
