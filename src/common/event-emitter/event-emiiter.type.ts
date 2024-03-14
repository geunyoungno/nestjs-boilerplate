import type IUserEntity from '#nestjs-common/user/entity/user.entity.type';

export interface IEventPayload {
  'email.sign-up': {
    userUuid: IUserEntity['uuid'];
  };
}
