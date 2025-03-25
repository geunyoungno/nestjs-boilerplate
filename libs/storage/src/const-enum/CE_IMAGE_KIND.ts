import { CE_USER_IMAGE_KIND } from '#user/const-enum/CE_USER_IMAGE_KIND';

export const CE_IMAGE_KIND = {
  ...CE_USER_IMAGE_KIND,
} as const;

export type CE_IMAGE_KIND = (typeof CE_IMAGE_KIND)[keyof typeof CE_IMAGE_KIND];
