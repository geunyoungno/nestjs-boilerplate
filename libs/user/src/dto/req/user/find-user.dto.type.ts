import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IFindUserParamBaseDto {
  /** 사용자 uuid */
  userUuid: IUserBaseDto['uuid'];
}
