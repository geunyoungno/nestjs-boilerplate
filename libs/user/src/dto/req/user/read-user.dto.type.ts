import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IReadUserParamBaseDto {
  /** 사용자 uuid */
  userUuid: IUserBaseDto['uuid'];
}
