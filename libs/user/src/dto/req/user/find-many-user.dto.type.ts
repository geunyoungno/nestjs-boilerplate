import { type IFindUserQueryBaseDto } from '#user/dto/req/user/find-user.dto.type';
import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IFindManyUserParamBaseDto {
  /** 사용자 uuid 목록 */
  userUuids?: Array<IUserBaseDto['uuid']>;
}

export interface IFindManyUserQueryBaseDto extends Pick<IFindUserQueryBaseDto, 'includes'> {}
