import { SearchUserQueryBaseDto } from '#user/dto/req/user/search-user.dto';
import { type ISearchUserQueryBaseDto } from '#user/dto/req/user/search-user.dto.type';

export class SearchUserQueryDto extends SearchUserQueryBaseDto implements ISearchUserQueryBaseDto {}
