import { SearchUserBaseDto, SearchUserMetaBaseDto } from '#user/dto/res/user/search-user.dto';
import { type ISearchUserBaseDto, type ISearchUserMetaBaseDto } from '#user/dto/res/user/search-user.dto.type';

export class SearchUserDto extends SearchUserBaseDto implements ISearchUserBaseDto {}

export class SearchUserMetaDto extends SearchUserMetaBaseDto implements ISearchUserMetaBaseDto {}
