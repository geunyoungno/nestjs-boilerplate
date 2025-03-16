import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AbstractRepository } from '#common/adaptor/database/repository/abstract.repository';
import { typeormMysqlNestDBSymbol } from '#common/adaptor/database/typeorm.provider';
import { UserAttributeEntity, UserEntity } from '#user/entity/user.entity';
import { type IUserRepository } from '#user/repository/user.repository.type';
import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity, UserAttributeEntity> implements IUserRepository {
  constructor(@Inject(typeormMysqlNestDBSymbol) dataSource: DataSource, clsService: ClsService) {
    super({
      alias: CE_TABLE_INFO.USER_ALIAS,
      attribute: UserAttributeEntity,
      clsService,
      dataSource,
      draft: UserEntity.draft,
      entity: UserEntity,
    });
  }

  // SECTION - 단건
  find: IUserRepository['find'] = async (args) => {
    const findQueryBuilder = this.findQueryBuilder(args);

    const { condition } = args;
    if ('email' in condition && condition.email != null) {
      findQueryBuilder.andWhere(`${this.alias}.email = :email`, { email: condition.email });
    }

    return findQueryBuilder.getOne();
  };

  // SECTION - 다건
  findMany: IUserRepository['findMany'] = async (args) => {
    const findManyQueryBuilder = this.findManyQueryBuilder(args);

    return await findManyQueryBuilder.getMany();
  };
  // !SECTION
}
