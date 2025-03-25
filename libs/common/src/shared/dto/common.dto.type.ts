export interface ICommonDto {
  // SECTION - uuid
  /** 고유 uuid, 외부용 */
  uuid: string;

  /** 사용자 uuid */
  userUuid: string;

  /** 이미지 uuid */
  imageUuid: string;
  // !SECTION

  // SECTION - date-time
  /** 생성 시점 */
  createdAt: Date;

  /** 최근 수정 시점 */
  updatedAt: Date;
  // !SECTION

  // SECTION - 파일, 이미지
  /** 원본 이미지 url */
  originalUrl: string;

  /** 썸네일 이미지 url */
  thumbnailUrl: string;
  // !SECTION

  /**
   * 우선순위
   * * 숫자가 클수록 우선순위가 높음
   */
  priority: number;

  /** 기본 여부 */
  isDefault: boolean;
}
