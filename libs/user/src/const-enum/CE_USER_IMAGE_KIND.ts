/**
 * 사용자 이미지 종류
 * 1:1 - AVATAR
 *
 * * AVATAR, user:avatar: 사용자 프로필 아바타 이미지
 */
export const CE_USER_IMAGE_KIND = {
  AVATAR: 'user:avatar',
} as const;

export type CE_USER_IMAGE_KIND = (typeof CE_USER_IMAGE_KIND)[keyof typeof CE_USER_IMAGE_KIND];

export const userImageKindDescriptions = [
  '사용자 이미지 종류',
  `* ${CE_USER_IMAGE_KIND.AVATAR}: 사용자 프로필 아바타 이미지, 1:1`,
] as const;
