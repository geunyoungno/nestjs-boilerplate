import { SearchMetaBaseDto } from '#common/shared/dto/res/search.dto';
import { type ISearchUserBaseDto, type ISearchUserMetaBaseDto } from '#user/dto/res/user/search-user.dto.type';
import { UserBaseDto } from '#user/dto/res/user/user.dto';

export class SearchUserBaseDto extends UserBaseDto implements ISearchUserBaseDto {}

export class SearchUserMetaBaseDto extends SearchMetaBaseDto implements ISearchUserMetaBaseDto {}
