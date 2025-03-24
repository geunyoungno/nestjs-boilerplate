import { CE_MAIL_TYPE } from '#common/adaptor/mailer/const-enum/CE_MAIL_TYPE';

export const CE_MAIL_SUBJECT = {
  /** 카탈로그 이메일 */
  /** 비회원 비밀번호 재설정 인증 메일 */
  [CE_MAIL_TYPE.GUEST_RESET_PASSWORD_VERIFICATION]: '비밀번호 재설정',
  /** 회원가입 인증 메일 */
  [CE_MAIL_TYPE.USER_SIGNUP_VERIFICATION]: '회원가입 인증',
} as const satisfies Record<CE_MAIL_TYPE, string>;
