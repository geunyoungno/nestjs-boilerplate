export interface ISearchMetaBaseDto {
  /**
   * 한 페이지당 보여줄 개수
   * * query 의 limit 과 동일
   */
  limit: number;

  /**
   * 현재 페이지
   */
  page: number;

  /**
   * 전체 개수
   */
  totalCount: number;
}
