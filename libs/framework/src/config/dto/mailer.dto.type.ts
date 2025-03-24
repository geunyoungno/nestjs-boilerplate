export interface IMailerConfig {
  // transport
  /** 보내는 데 사용하는 서비스 */
  service: string;
  /** 인증정보 */
  auth: {
    username: string;
    password: string;
  };

  // defaults
  /** 보내는 사람 */
  from: string;
}
