import type IUserEntity from '#nestjs-common/user/entity/user.entity.type';
import { type UserEntity } from '#user/entity/user.entity';

export interface IUserRepository {
  /** 회원 단건 조회 */
  find(args: {
    condition: Pick<IUserEntity, 'uuid'> | Pick<IUserEntity, 'id'> | Pick<IUserEntity, 'email'>;
  }): Promise<UserEntity | null>;

  /** 회원 대량건 조회 */
  findMany(): Promise<UserEntity[]>;

  /** 회원 단건 생성 */
  create(args: { value: Partial<Omit<IUserEntity, 'id'>> }): Promise<Pick<UserEntity, 'id' | 'uuid'>>;

  /** 회원 단건 수정 */
  update(args: {
    condition: Pick<IUserEntity, 'uuid'>;
    value: Partial<Omit<IUserEntity, 'id' | 'uuid'>>;
  }): Promise<Pick<UserEntity, 'uuid'>>;
}
