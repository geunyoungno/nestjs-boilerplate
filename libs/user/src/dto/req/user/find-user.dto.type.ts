import { type CE_USER_INCLUDE } from '#user/const-enum/CE_USER_INCLUDE';
import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IFindUserParamBaseDto {
  /** 사용자 uuid */
  userUuid: IUserBaseDto['uuid'];
}

export interface IFindUserQueryBaseDto {
  /** 사용자 연관 정보 */
  includes?: CE_USER_INCLUDE[];
}
