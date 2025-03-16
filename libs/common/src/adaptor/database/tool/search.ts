import { type CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { type IEntity, type TExtra } from '#common/adaptor/database/repository/abstract.repository.type';
import { withDeleted } from '#common/adaptor/database/tool/withDeleted';
import {
  type ISearchConditionBaseDto,
  type ISearchPaginationBaseDto,
  type ISearchSortBaseDto,
} from '#common/shared/dto/req/search.dto.type';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { camelCase, snakeCase } from 'change-case-all';
import dayjs from 'dayjs';
import { type LiteralUnion, type Replace, type SnakeCase, type Split } from 'type-fest';
import { type SelectQueryBuilder } from 'typeorm';

/** 검색 쿼리 */
export const getSearchQueryRecord = <
  TEntity extends IEntity,
  TCondition extends Partial<Record<string, unknown> | ISearchConditionBaseDto> = ISearchConditionBaseDto,
>() =>
  ({
    // step. soft delete 제외
    ['softDelete']: (args) => {
      const searchQueryBuilder = args.searchQueryBuilder;
      withDeleted({ queryBuilder: searchQueryBuilder, alias: args.alias });

      return searchQueryBuilder;
    },
    // step. 5년 이전 데이터 제외
    ['beforeYear']: (args) => {
      const now =
        isNotEmpty(args?.extra) && 'now' in args.extra && isNotEmpty(args.extra.now) ? args.extra.now : new Date();
      const searchQueryBuilder = args.searchQueryBuilder;

      searchQueryBuilder.andWhere(`${args.alias}.created_at >= :beforeYear`, {
        beforeYear: dayjs(now).subtract(5, 'year').toDate(),
      });

      return searchQueryBuilder;
    },
    // step. 생성일자 필터
    ['createdAtFilter']: (args) => {
      const searchQueryBuilder = args.searchQueryBuilder;
      const createdAt = args.condition['filter.createdAt'] as ISearchConditionBaseDto['filter.createdAt'];

      if (isNotEmpty(createdAt) && Array.isArray(createdAt)) {
        const fieldName = 'created_at';
        Object.values(createdAt).forEach((value) => {
          const [operator, ...restFieldValue] = value.split(':') as Split<typeof value, ':'>;
          const fieldValue = restFieldValue.join(':');
          const key = `${operator.replace('$', '') as Replace<typeof operator, '$', ''>}_${fieldName}`;

          if (operator === '$gte') {
            searchQueryBuilder.andWhere(`${args.alias}.${fieldName} >= :${key}`, { [key]: fieldValue });
          }

          if (operator === '$lte') {
            searchQueryBuilder.andWhere(`${args.alias}.${fieldName} <= :${key}`, { [key]: fieldValue });
          }
        });
      }

      return searchQueryBuilder;
    },
    // step. 수정일자 필터
    ['updatedAtFilter']: (args) => {
      const searchQueryBuilder = args.searchQueryBuilder;
      const updatedAt = args.condition['filter.updatedAt'] as ISearchConditionBaseDto['filter.updatedAt'];

      if (isNotEmpty(updatedAt) && Array.isArray(updatedAt)) {
        const fieldName = 'updated_at';
        Object.values(updatedAt).forEach((value) => {
          const [operator, ...restFieldValue] = value.split(':') as Split<typeof value, ':'>;
          const fieldValue = restFieldValue.join(':');
          const key = `${operator.replace('$', '') as Replace<typeof operator, '$', ''>}_${fieldName}`;

          if (operator === '$gte') {
            searchQueryBuilder.andWhere(`${args.alias}.${fieldName} >= :${key}`, { [key]: fieldValue });
          }

          if (operator === '$lte') {
            searchQueryBuilder.andWhere(`${args.alias}.${fieldName} <= :${key}`, { [key]: fieldValue });
          }
        });
      }

      return searchQueryBuilder;
    },
    // step. 검색 조건
    ['search']: (args) => {
      const searchQueryBuilder = args.searchQueryBuilder;
      const { search } = args.condition;

      if (isNotEmpty(search) && typeof search === 'string') {
        searchQueryBuilder.andWhere(
          `(${[
            // 가격 모형 적책 uuid
            `${args.alias}.uuid LIKE :search`,
          ].join(' OR ')})`,
          {
            search: `%${search}%`,
          },
        );
      }

      return searchQueryBuilder;
    },
  }) satisfies Record<
    string,
    (args: {
      condition: TCondition;
      extra?: TExtra;

      alias: LiteralUnion<Extract<CE_TABLE_INFO, `${string}_as`>, `${string}_as`>;
      searchQueryBuilder: SelectQueryBuilder<TEntity>;
    }) => SelectQueryBuilder<TEntity>
  >;

/** clone 이 필요한 검색 쿼리 */
export const getSearchCloneQueryRecord = <
  TEntity extends IEntity,
  TSort extends Array<`${string}:${'ASC' | 'DESC'}`> | undefined = ISearchSortBaseDto['sortBy'],
>() =>
  ({
    ['sortBy']: (args) => {
      // NOTE: ORDER BY clause is not in GROUP BY clause 오류가 발생하여서 status group 에서는 정렬 조건을 사용하지 않는다.
      // take, skip 사용시 entity필드 이름을 정렬 조건에 추가해야 한다...
      // @see https://velog.io/@pk3669/NEST-TypeORM-Take%EC%99%80-Limit%EC%9D%98-%EC%B0%A8%EC%9D%B4
      // @see https://github.com/typeorm/typeorm/issues/8213#issuecomment-1357916375
      const sortSearchQueryBuilder = args.searchQueryBuilder;
      const sortBy = args.sort;

      if (isNotEmpty(sortBy)) {
        sortBy?.forEach((sort) => {
          const [field, order] = sort.split(':') as Split<typeof sort, ':'>;

          const fieldName = snakeCase(field) as SnakeCase<typeof field>;

          sortSearchQueryBuilder.addOrderBy(`${args.alias}.${camelCase(fieldName)}`, order);
        });
      }

      // id 순 정렬조건이 없으면 추가해준다
      if (Object.keys(sortSearchQueryBuilder.expressionMap.orderBys).every((key) => key !== `${args.alias}.id`)) {
        // 기본 정렬 추가
        sortSearchQueryBuilder.addOrderBy(`${args.alias}.id`, 'DESC');
      }

      return sortSearchQueryBuilder;
    },
  }) satisfies Record<
    string,
    (args: {
      sort: TSort;

      alias: LiteralUnion<Extract<CE_TABLE_INFO, `${string}_as`>, `${string}_as`>;
      searchQueryBuilder: SelectQueryBuilder<TEntity>;
    }) => SelectQueryBuilder<TEntity>
  >;

export async function executeSearchQuery<
  TEntity extends IEntity,
  TPagination extends ISearchPaginationBaseDto = ISearchPaginationBaseDto,
>(args: {
  pagination: TPagination;
  alias: LiteralUnion<Extract<CE_TABLE_INFO, `${string}_as`>, `${string}_as`>;
  totalCountSearchQueryBuilder: SelectQueryBuilder<TEntity>; // 전체 갯수 검색 쿼리 빌러
  sortSearchQueryBuilder: SelectQueryBuilder<TEntity>; // 정렬이 적용된 쿼리 빌더
}): Promise<{
  totalCount: number;
  entities: TEntity[];
}> {
  const page = args.pagination.page;
  const limit = args.pagination.limit;
  const { totalCountSearchQueryBuilder, sortSearchQueryBuilder } = args;

  const [totalCount, entities] = await Promise.all([
    // 전체 갯수
    totalCountSearchQueryBuilder.clone().comment(`${args.alias}.totalCount`).getCount(),
    // 정렬 조건 적용됨
    sortSearchQueryBuilder
      .clone()
      .comment(`${args.alias}.ids`)
      .skip((page - 1) * limit)
      .take(limit)
      // .groupBy(`${CE_TABLE_INFO.ORDER_ALIAS}.id`)
      /**
       * https://stackoverflow.com/questions/72108412/why-skip-and-take-not-works-when-i-use-getrawmany-in-nestjs-with-typeorm
       * take, skip 사용시 getRawMany 사용하면 제대로 조회되지 않는다.
       * join, offset, limit 등의 mysql query 가 적용되지 않는다.
       */
      // .select(`${CE_TABLE_INFO.ORDER_ALIAS}.id`, 'id').getRawMany<{ id: string }>()
      .getMany(),
  ]);

  return { totalCount, entities };
}
