import 'nestjs-cls';

declare module 'nestjs-cls' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ClsStore {
    /** Request 고유 번호 */
    requestId: string;

    /** 사용자 UUID */
    userUuid?: string;
  }
}
