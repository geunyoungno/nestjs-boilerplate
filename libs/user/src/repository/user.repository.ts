import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AbstractRepository } from '#common/adaptor/database/repository/abstract.repository';
import { TAlias } from '#common/adaptor/database/repository/abstract.repository.type';
import { typeormMysqlNestDBSymbol } from '#common/adaptor/database/typeorm.provider';
import { CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import isEmpty, { isNotEmpty } from '#common/shared/tool/isEmpty';
import { CE_USER_SEARCH_BY } from '#user/const-enum/CE_USER_SEARCH_BY';
import { UserAttributeEntity, UserEntity } from '#user/entity/user.entity';
import { type IUserRepository } from '#user/repository/user.repository.type';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Entries, LiteralUnion } from 'type-fest';
import { FirstArrayElement } from 'type-fest/source/internal';
import { DataSource, SelectQueryBuilder } from 'typeorm';

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
      errorCodeMap: { [HttpStatus.NOT_FOUND]: CE_ERROR_CODE.USER.NOT_FOUND },
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

  protected searchQueryRecord(): Record<
    string,
    (args: {
      condition: FirstArrayElement<Parameters<IUserRepository['search']>>['condition'];
      alias: LiteralUnion<typeof CE_TABLE_INFO.USER_ALIAS, TAlias>;
      searchQueryBuilder: SelectQueryBuilder<UserEntity>;
    }) => SelectQueryBuilder<UserEntity>
  > {
    return {
      ...super.searchQueryRecord(),
      // step. 검색 조건
      ['search']: (args) => {
        const { alias, searchQueryBuilder } = args;
        const { search, searchBy } = args.condition;

        // 검색어의 경우 undefined, null, '' 인 경우는 검색하지 않는다.
        if (isNotEmpty(search)) {
          const searchByField = (
            Object.entries({
              [CE_USER_SEARCH_BY.FULL_NAME]: `${alias}.full_name LIKE :search`,
              [CE_USER_SEARCH_BY.EMAIL]: `${alias}.email LIKE :search`,
            }) as Entries<Record<CE_USER_SEARCH_BY, string>>
          ).filter(([key]) => {
            //  검색 조건이 없으면은 모든 조건을 검색한다.
            if (isEmpty(searchBy)) {
              return true;
            }

            return searchBy.includes(key);
          });

          if (searchByField.length > 0) {
            searchQueryBuilder.andWhere(`(${searchByField.map(([, query]) => query).join(' OR ')})`, {
              search: `%${search}%`,
            });
          }
        }

        return searchQueryBuilder;
      },
    };
  }
}
