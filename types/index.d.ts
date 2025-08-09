import { type CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line
    interface ProcessEnv {
      // SECTION - server
      /** 실행환경 설정: local, develop, qa, stage, production 다섯가지 모드가 있다. */
      RUN_MODE?: CE_RUN_MODE | string;
      // !SECTION

      // SECTION - mysql
      /** nest db 사용자 이름 */
      NEST_DB_USERNAME?: string;
      /** nest db 사용자 비밀번호 */
      NEST_DB_PASSWORD?: string;
      // !SECTION

      // SECTION - mailer
      /** aws ses 이름 */
      MAILER_AWS_SES_USERNAME?: string;
      /** aws ses 비밀번호 */
      MAILER_AWS_SES_PASSWORD?: string;
      // !SECTION

      // SECTION - slack
      /** slack oauth token */
      SLACK_OAUTH_TOKEN?: string;
      // !SECTION
    }
  }
}
