import type IUserEntity from '#user/entity/user.entity.type';

export interface IEventPayload {
  'email.sign-up': {
    userUuid: IUserEntity['uuid'];
  };
}
