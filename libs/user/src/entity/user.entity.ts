import { TokenEntity } from '#auth/entity/token.entity';
import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AttributeEntity } from '#common/adaptor/database/entity/entity';
import { TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import { toCamel, toPascal } from '#common/adaptor/database/tool/convertCase';
import { draftAttribute } from '#common/adaptor/database/tool/draft';
import { UserImageLinkageEntity } from '#user/entity/user-image-linkage.entity';
import { type IUserAttributeEntity, type IUserEntity } from '#user/entity/user.entity.type';
import { Column, Entity, Index, OneToMany } from 'typeorm';

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
    name: 'password',
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

  declare createdBy: string;

  declare updatedBy: string;

  declare deletedBy: string | null;
  // !SECTION
}

@Entity({ name: CE_TABLE_INFO.USER, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
@Index('uix_email', ['email'], { unique: true })
class User extends UserAttributeEntity implements IUserEntity {
  // SECTION - relation
  @OneToMany(toPascal(CE_TABLE_INFO.TOKEN), toCamel(CE_TABLE_INFO.USER), { createForeignKeyConstraints: false })
  tokens!: TokenEntity[];

  @OneToMany(toPascal(CE_TABLE_INFO.USER_IMAGE_LINKAGE), toCamel(CE_TABLE_INFO.USER), {
    createForeignKeyConstraints: false,
  })
  userImageLinkages!: UserImageLinkageEntity[];
  // !SECTION

  // insert에 입력할 값을 초기화 하기 위해서 사용한다
  // NOTE: draft 말고 다른 좋은 것 이 없을까?
  static draft: TDraft<UserAttributeEntity> = (args) => {
    const draftUser = {
      ...draftAttribute(args),

      email: args?.email ?? 'example@example.com',
      password: args?.password ?? '',
      fullName: args?.fullName ?? '',
    } satisfies Omit<IUserAttributeEntity, 'id'>;

    return draftUser;
  };
}

// NOTE: 클래스 명에 따라 relation 필드명이 결정된다.
// Entity가 붙어 있는 경우 무조건 relation 필드에 Entity가 붙어서 alias 를 사용하였다.
export { User as UserEntity };
