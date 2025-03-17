export interface ICommonDto {
  // SECTION - uuid
  /** 고유 uuid, 외부용 */
  uuid: string;

  // !SECTION

  // SECTION - date-time
  /** 생성 시점 */
  createdAt: Date;

  /** 최근 수정 시점 */
  updatedAt: Date;
  // !SECTION
}
