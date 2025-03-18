import { SearchBaseDto } from '#common/shared/dto/req/search.dto';
import { enumManyDecorator } from '#framework/decorator/dto/enum.decorator';
import { CE_USER_SEARCH_BY, userSearchByDescriptions } from '#user/const-enum/CE_USER_SEARCH_BY';
import { type ISearchUserQueryBaseDto } from '#user/dto/req/user/search-user.dto.type';

export class SearchUserQueryBaseDto extends SearchBaseDto implements ISearchUserQueryBaseDto {
  @enumManyDecorator({
    description: userSearchByDescriptions.join('\n'),
    enum: CE_USER_SEARCH_BY,
    required: false,
  })
  searchBy?: CE_USER_SEARCH_BY[];

  declare search?: string;
}
