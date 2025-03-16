import { type UserEntity } from '#user/entity/user.entity';
import { type IUserAttributeEntity } from '#user/entity/user.entity.type';

export interface IUserRepository {
  // SECTION - 단건
  /** 사용자 단건 조회 */
  find(args: {
    condition:
      | Pick<IUserAttributeEntity, 'uuid'>
      | Pick<IUserAttributeEntity, 'id'>
      | Pick<IUserAttributeEntity, 'email'>;
  }): Promise<UserEntity | null>;

  /** 사용자 단건 생성 */
  create(args: {
    value: Partial<Omit<IUserAttributeEntity, 'id'>>;
  }): Promise<Pick<IUserAttributeEntity, 'id' | 'uuid'>>;

  /** 사용자 단건 수정 */
  update(args: {
    condition: Pick<IUserAttributeEntity, 'uuid'>;
    value: Partial<Omit<IUserAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<Pick<UserEntity, 'uuid'>>;
  // !SECTION

  // SECTION - 다건
  /** 사용자 다건 조회 */
  findMany(args: { condition: {} }): Promise<UserEntity[]>;
  // !SECTION
}
