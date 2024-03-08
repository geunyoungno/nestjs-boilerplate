import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import IUserEntity from '#user/entity/interface/IUserEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

@Entity({ name: `${CE_TABLE_INFO.USER}`, engine: 'InnoDB' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    unsigned: true,
    comment: `${CE_TABLE_INFO.USER_SUMMARY} id`,
    name: 'id',
  })
  id!: string;

  @Column({
    // typeorm 의 uuid 타입의 경우 uuid v4로 자동 입력이 된다.
    // @see https://github.com/typeorm/typeorm/blob/master/src/query-builder/InsertQueryBuilder.ts#L827-L833
    // 자동 입력되는 경우 auto generate 가 되는 primary key일 경우만이다
    // 아닐 경우 직접 입력해 주어야 한다.
    type: 'uuid',
    unique: true,
    comment: `${CE_TABLE_INFO.USER_SUMMARY} uuid`,
    name: 'uuid',
  })
  uuid!: string;

  @Column({
    type: 'varchar',
    charset: 'utf8mb4',
    comment: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
    name: 'full_name',
  })
  fullName!: string;

  @Column({
    type: 'datetime',
    comment: '생성 시점',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    comment: '수정 시점',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  // insert에 입력할 값을 초기화 하기 위해서 사용한다
  // NOTE: draft 말고 다른 좋은 것 이 없을까?
  static draft(args?: Readonly<Partial<IUserEntity>>): Omit<IUserEntity, 'id'> {
    const now = new Date();

    const partialUser = {
      uuid: args?.uuid ?? uuid.v4(),
      fullName: args?.fullName ?? '',
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
    } satisfies Omit<IUserEntity, 'id'>;

    return partialUser;
  }
}
