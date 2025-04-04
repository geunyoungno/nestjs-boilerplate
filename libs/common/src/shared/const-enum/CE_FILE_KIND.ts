/**
 * NOTE: 파일 종류 관계
 * 1:1 - USER_PROFILE
 * 1:N - USER_AVATAR
 */
/**
 * 파일 종류
 * * USER_PROFILE, user:profile: 사용자 프로필
 * * USER_AVATAR, user:avatar: 사용자 아바타
 */
export const CE_FILE_KIND = {
  USER_PROFILE: 'user:profile',
  USER_AVATAR: 'user:avatar',
} as const;

export type CE_FILE_KIND = (typeof CE_FILE_KIND)[keyof typeof CE_FILE_KIND];
