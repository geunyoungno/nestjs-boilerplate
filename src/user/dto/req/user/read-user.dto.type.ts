import { type IUserDomainDto } from '#user/dto/res/user/user.dto.type';

export interface IReadUserParamDomainDto {
  /** 사용자 uuid */
  userUuid: IUserDomainDto['uuid'];
}
