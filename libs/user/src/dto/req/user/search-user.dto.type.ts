import { type ISearchBaseDto } from '#common/shared/dto/req/search.dto.type';
import { type CE_USER_SEARCH_BY } from '#user/const-enum/CE_USER_SEARCH_BY';

export interface ISearchUserQueryBaseDto extends ISearchBaseDto {
  /**
   * 검색 조건
   */
  searchBy?: CE_USER_SEARCH_BY[];

  /**
   * 검색어
   */
  search?: string;
}
