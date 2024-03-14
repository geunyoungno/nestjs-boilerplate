declare namespace NodeJS {
  // eslint-disable-next-line
  interface ProcessEnv {
    /** 실행환경 설정: local, develop, qa, stage, production 다섯가지 모드가 있다. */
    RUN_MODE?: string;

    /** nest db 사용자 이름 */
    NEST_DB_USERNAME?: string;
    /** nest db 사용자 비밀번호 */
    NEST_DB_PASSWORD?: string;

    /** gmail 사용자 이름 */
    MAILER_GMAIL_USERNAME?: string;
    /** gmail 사용자 비밀번호 */
    MAILER_GMAIL_PASSWORD?: string;
  }
}
