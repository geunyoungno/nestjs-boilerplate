import { type IFindUserParamBaseDto } from '#user/dto/req/user/find-user.dto.type';

export interface IRemoveUserParamBaseDto extends Pick<IFindUserParamBaseDto, 'userUuid'> {}
