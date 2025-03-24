/**
 * 메일 종류
 * * GUEST_RESET_PASSWORD_VERIFICATION, guest.reset-password.verification: 비회원 비밀번호 재설정 인증 메일
 * * USER_SIGNUP_VERIFICATION, user.signup.verification: 회원가입 인증 메일
 */
export const CE_MAIL_TYPE = {
  GUEST_RESET_PASSWORD_VERIFICATION: 'guest.reset-password.verification',
  USER_SIGNUP_VERIFICATION: 'user.signup.verification',
} as const satisfies Record<string, string>;

export type CE_MAIL_TYPE = (typeof CE_MAIL_TYPE)[keyof typeof CE_MAIL_TYPE];
