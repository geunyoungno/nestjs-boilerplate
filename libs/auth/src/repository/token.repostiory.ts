import { TokenAttributeEntity, TokenEntity } from '#auth/entity/token.entity';
import { ITokenRepository } from '#auth/repository/token.repository.type';
import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AbstractRepository } from '#common/adaptor/database/repository/abstract.repository';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TokenRepository extends AbstractRepository<TokenEntity, TokenAttributeEntity> implements ITokenRepository {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super({
      alias: CE_TABLE_INFO.TOKEN_ALIAS,
      dataSource,
      draft: TokenEntity.draft,
      entity: TokenEntity,
      attribute: TokenAttributeEntity,
    });
  }

  // SECTION - 단건
  find: ITokenRepository['find'] = async (args) => {
    const findQueryBuilder = this.findQueryBuilder(args);

    const { condition } = args;
    if ('userId' in condition && isNotEmpty(condition.userId)) {
      findQueryBuilder.andWhere(`${this.alias}.user_id = :userId`, { userId: condition.userId });
    }
    if ('status' in condition && isNotEmpty(condition.status)) {
      findQueryBuilder.andWhere(`${this.alias}.token_status = :status`, { status: condition.status });
    }

    return await findQueryBuilder.getOne();
  };
  // !SECTION

  // SECTION - 다건
  findMany: ITokenRepository['findMany'] = async (args) => {
    const findManyQueryBuilder = this.findManyQueryBuilder(args);

    const { condition } = args;
    if ('userUuid' in condition && isNotEmpty(condition.userUuid)) {
      findManyQueryBuilder.andWhere(`${this.alias}.user_uuid = :userUuid`, { userUuid: condition.userUuid });
    }
    if ('status' in condition && isNotEmpty(condition.status)) {
      findManyQueryBuilder.andWhere(`${this.alias}.token_status = :status`, { status: condition.status });
    }

    return await findManyQueryBuilder.getMany();
  };

  updateMany: ITokenRepository['updateMany'] = async (args) => {
    const updateManyQueryBuilder = this.repository.createQueryBuilder().update().set(args.value);

    const { condition } = args;
    updateManyQueryBuilder.andWhere(`uuid IN (:...uuids)`, { uuids: condition.uuids });
    updateManyQueryBuilder.andWhere(`token_status = :status`, { status: condition.status });

    const updateResult = await updateManyQueryBuilder.updateEntity(false).execute();

    return { updateResult };
  };
  // !SECTION
}
