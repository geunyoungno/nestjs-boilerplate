import { CE_TOKEN_EXPIRES_IN } from '#auth/const-enum/CE_TOKEN_EXPIRES_IN';
import { CE_TOKEN_STATUS } from '#auth/const-enum/CE_TOKEN_STATUS';
import { ITokenAttributeEntity, ITokenEntity } from '#auth/entity/token.entity.type';
import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AttributeEntity } from '#common/adaptor/database/entity/entity';
import { TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import * as column from '#common/adaptor/database/tool/column';
import { toPascal, toPluralCamel } from '#common/adaptor/database/tool/convertCase';
import { draftAttribute } from '#common/adaptor/database/tool/draft';
import { UserEntity } from '#user/entity/user.entity';
import dayjs from 'dayjs';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

const summary = CE_TABLE_INFO.TOKEN_SUMMARY;

export class TokenAttributeEntity extends AttributeEntity implements ITokenAttributeEntity {
  declare id: string;

  declare uuid: string;

  @Column({
    ...column.relationUuid,
    comment: [summary, '사용자 uuid'].join(' - '),
    name: 'user_uuid',
  })
  userUuid!: string;

  @Column({
    ...column.relationUuid,
    comment: [summary, '갱신전 토큰 uuid'].join(' - '),
    name: 'before_token_uuid',
    nullable: true,
    default: null,
  })
  beforeTokenUuid!: string | null;

  @Column({
    comment: [summary, '상태'].join(' - '),
    length: 8,
    name: 'status',
    type: 'varchar',
  })
  status!: CE_TOKEN_STATUS;

  @Column({
    comment: [summary, '리프레시 토큰'].join(' - '),
    name: 'refresh_token',
    type: 'text',
  })
  refreshToken!: string;

  @Column({
    comment: [summary, '토큰 만료 시점'].join(' - '),
    name: 'expired_at',
    type: 'datetime',
  })
  expiredAt!: Date;

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

@Entity({ name: CE_TABLE_INFO.TOKEN, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
@Index('ix_user_uuid', ['userUuid'])
class Token extends TokenAttributeEntity implements ITokenEntity {
  // SECTION - relation
  @ManyToOne(toPascal(CE_TABLE_INFO.USER), toPluralCamel(CE_TABLE_INFO.TOKEN), { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user!: UserEntity | null;
  // !SECTION

  static draft: TDraft<ITokenAttributeEntity> = (args) => {
    const draftToken = {
      ...draftAttribute(args),

      userUuid: args?.userUuid ?? '',
      beforeTokenUuid: args?.beforeTokenUuid ?? null,
      status: args?.status ?? CE_TOKEN_STATUS.ISSUE,
      refreshToken: args?.refreshToken ?? '',
      expiredAt:
        args?.expiredAt ??
        dayjs(args?.extra?.now ?? new Date())
          .add(CE_TOKEN_EXPIRES_IN.REFRESH, 'second')
          .toDate(),
    } satisfies Omit<ITokenAttributeEntity, 'id'>;

    return draftToken;
  };
}

export { Token as TokenEntity };
