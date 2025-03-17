import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AttributeEntity } from '#common/adaptor/database/entity/entity';
import { TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import { draftAttribute } from '#common/adaptor/database/tool/draft';
import type IUserEntity from '#user/entity/user.entity.type';
import { type IUserAttributeEntity } from '#user/entity/user.entity.type';
import { Column, Entity, Index } from 'typeorm';

const summary = CE_TABLE_INFO.USER_SUMMARY;

export class UserAttributeEntity extends AttributeEntity implements IUserAttributeEntity {
  declare id: string;

  declare uuid: string;

  @Column({
    comment: `${summary} 이메일`,
    length: 255,
    name: 'email',
    type: 'varchar',
  })
  email!: string;

  @Column({
    comment: `해시된 비밀번호`,
    length: 512,
    name: 'hashed_password', // password 가 Reserved Words 라서 변경함
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 255,
    comment: `${summary} 성명`,
    charset: 'utf8mb4',
  })
  fullName!: string;

  // SECTION - meta
  declare createdAt: Date;

  declare updatedAt: Date;

  declare deletedAt: Date | null;

  declare isDeleted: boolean;

  declare createdByUserUuid: string;

  declare updatedByUserUuid: string;

  declare deletedByUserUuid: string | null;
  // !SECTION
}

@Entity({ name: CE_TABLE_INFO.USER, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
@Index('uix_email', ['email'], { unique: true })
export class UserEntity extends UserAttributeEntity implements IUserEntity {
  // insert에 입력할 값을 초기화 하기 위해서 사용한다
  // NOTE: draft 말고 다른 좋은 것 이 없을까?
  static draft: TDraft<IUserEntity> = (args) => {
    const draftUser = {
      ...draftAttribute(args),

      email: args?.email ?? 'example@example.com',
      password: args?.password ?? '',
      fullName: args?.fullName ?? '',
    } satisfies Omit<IUserEntity, 'id'>;

    return draftUser;
  };
}
