import type IUserEntity from '#nestjs-common/user/entity/user.entity.type';
import { type UserEntity } from '#user/entity/user.entity';

export interface IUserRepository {
  /** 회원 단건 조회 */
  selectQuery(args: { uuid: IUserEntity['uuid'] }): Promise<UserEntity>;

  /** 회원 전체 목록 조회 */
  selectsQuery(): Promise<Array<UserEntity>>;

  /** 회원 단건 생성 */
  insertQuery(args?: Partial<Omit<IUserEntity, 'id'>>): Promise<Pick<IUserEntity, 'id' | 'uuid'>>;

  /** 회원 단건 수정 */
  updateQuery(
    args: { uuid: IUserEntity['uuid'] } & Partial<Omit<IUserEntity, 'id' | 'uuid'>>,
  ): Promise<Pick<IUserEntity, 'uuid'>>;
}
