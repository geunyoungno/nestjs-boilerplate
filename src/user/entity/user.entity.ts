import * as column from '#common/database/column';
import { CE_TABLE_INFO } from '#nestjs-common/common/const-enum/CE_TABLE_INFO';
import type IUserEntity from '#nestjs-common/user/entity/user.entity.type';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

@Entity({ name: `${CE_TABLE_INFO.USER}`, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn(...column.id)
  id!: string;

  @Column(column.uuid)
  uuid!: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
    comment: `${CE_TABLE_INFO.USER_SUMMARY} 이메일`,
  })
  email!: string;

  @Column({
    type: 'varchar',
    // password 가 Reserved Words 라서 변경함
    name: 'hashed_password',
    length: 512,
    comment: `해시된 비밀번호`,
  })
  password!: string;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 255,
    comment: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
    charset: 'utf8mb4',
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

    const darftUser = {
      uuid: args?.uuid ?? uuid.v4(),
      email: args?.email ?? 'example@example.com',
      password: args?.password ?? '',
      fullName: args?.fullName ?? '',
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
    } satisfies Omit<IUserEntity, 'id'>;

    return darftUser;
  }
}
