import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AbstractRepository } from '#common/adaptor/database/repository/abstract.repository';
import { defaultJoinMethod, TAlias, TJoinMethod } from '#common/adaptor/database/repository/abstract.repository.type';
import { toCamel } from '#common/adaptor/database/tool/convertCase';
import { relationWithDeleted } from '#common/adaptor/database/tool/withDeleted';
import { typeormMysqlNestDBSymbol } from '#common/adaptor/database/typeorm.provider';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { UserImageLinkageAttributeEntity, UserImageLinkageEntity } from '#user/entity/user-image-linkage.entity';
import { type IUserImageLinkageRepository } from '#user/repository/user-image-linkage.repository.type';
import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { DataSource, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function userImageLinkageRelation<TEntity extends ObjectLiteral = UserImageLinkageEntity>(args: {
  queryBuilder: SelectQueryBuilder<TEntity>;
  alias?: TAlias;
  joinMethod?: TJoinMethod;
}): SelectQueryBuilder<TEntity> {
  const alias = args?.alias ?? CE_TABLE_INFO.USER_IMAGE_LINKAGE_ALIAS;
  const joinMethod = args?.joinMethod ?? defaultJoinMethod;

  args.queryBuilder[joinMethod](
    `${alias}.${toCamel(CE_TABLE_INFO.IMAGE)}`,
    `${alias}_${CE_TABLE_INFO.IMAGE_ALIAS}`,
    ...relationWithDeleted({ alias: `${alias}_${CE_TABLE_INFO.IMAGE_ALIAS}` }),
  );

  return args.queryBuilder;
}

@Injectable()
export class UserImageLinkageRepository
  extends AbstractRepository<UserImageLinkageEntity, UserImageLinkageAttributeEntity>
  implements IUserImageLinkageRepository
{
  constructor(@Inject(typeormMysqlNestDBSymbol) dataSource: DataSource, clsService: ClsService) {
    super({
      alias: CE_TABLE_INFO.USER_IMAGE_LINKAGE_ALIAS,
      attribute: UserImageLinkageAttributeEntity,
      clsService,
      dataSource,
      draft: UserImageLinkageEntity.draft,
      entity: UserImageLinkageEntity,
    });
  }

  // SECTION - 다건
  findMany: IUserImageLinkageRepository['findMany'] = async (args) => {
    const findManyQueryBuilder = this.findManyQueryBuilder(args);
    userImageLinkageRelation({ queryBuilder: findManyQueryBuilder });

    const { condition } = args;
    if ('userUuids' in condition && isNotEmpty(condition.userUuids)) {
      findManyQueryBuilder.andWhere(`${this.alias}.user_uuid IN (:...userUuids)`, { userUuids: condition.userUuids });
    }
    if ('kind' in condition && isNotEmpty(condition.kind)) {
      findManyQueryBuilder.andWhere(`${this.alias}.kind = :kind`, { kind: condition.kind });
    }
    if ('userUuid' in condition && isNotEmpty(condition.userUuid)) {
      findManyQueryBuilder.andWhere(`${this.alias}.user_uuid = :userUuid`, { userUuid: condition.userUuid });
    }

    return await findManyQueryBuilder.getMany();
  };

  updateMany: IUserImageLinkageRepository['updateMany'] = async (args) => {
    const updateManyQueryBuilder = this.repository.createQueryBuilder().update().set(args.value);

    updateManyQueryBuilder.andWhere(`kind = :kind`, { kind: args.condition.kind });
    updateManyQueryBuilder.andWhere(`user_uuid = :userUuid`, { userUuid: args.condition.userUuid });
    updateManyQueryBuilder.andWhere(`uuid NOT IN (:...withoutUuids)`, { withoutUuids: args.condition.withoutUuids });

    const updateResult = await updateManyQueryBuilder.updateEntity(false).execute();

    return { updateResult };
  };

  removeMany: IUserImageLinkageRepository['removeMany'] = async (args) => {
    const removeManyQueryBuilder = this.repository
      .createQueryBuilder()
      .update()
      .set({
        ...args.value,
        isDeleted: args.value?.isDeleted ?? true,
        deletedAt: args.value?.deletedAt ?? new Date(),
      });

    removeManyQueryBuilder.andWhere(`is_deleted = :isDeleted`, { isDeleted: false }); // 삭제되지 않은 건들
    removeManyQueryBuilder.andWhere(`kind = :kind`, { kind: args.condition.kind }); // 특정 종류의 이미지
    removeManyQueryBuilder.andWhere(`user_uuid = :userUuid`, { userUuid: args.condition.userUuid }); // 특정 사용자
    removeManyQueryBuilder.andWhere(`uuid NOT IN (:...withoutUuids)`, { withoutUuids: args.condition.withoutUuids }); // 특정한 uuid 목록만을 제외하고

    const updateResult = await removeManyQueryBuilder.updateEntity(false).execute();

    return { updateResult };
  };

  upsertMany: IUserImageLinkageRepository['upsertMany'] = async (args) => {
    return await super.upsertMany(args);
  };
  // !SECTION
}
