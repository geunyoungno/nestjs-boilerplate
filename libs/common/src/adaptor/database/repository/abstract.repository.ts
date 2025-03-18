import { type CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { type IAttributeEntity } from '#common/adaptor/database/entity/entity.type';
import {
  type IAbstractRepository,
  type IEntity,
  type TAlias,
  type TDraft,
  type TExtra,
  type TInclude,
} from '#common/adaptor/database/repository/abstract.repository.type';
import { createdByUserUuid, updatedByUserUuid } from '#common/adaptor/database/tool/byUserUuid';
import {
  executeSearchQuery,
  getSearchCloneQueryRecord,
  getSearchQueryRecord,
} from '#common/adaptor/database/tool/search';
import { withDeleted } from '#common/adaptor/database/tool/withDeleted';
import { CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import {
  type ISearchConditionBaseDto,
  type ISearchPaginationBaseDto,
  type ISearchSortBaseDto,
} from '#common/shared/dto/req/search.dto.type';
import { type ISearchMetaBaseDto } from '#common/shared/dto/res/search.dto.type';
import { getInsertId } from '#common/shared/tool/getInsertId';
import isEmpty, { isNotEmpty } from '#common/shared/tool/isEmpty';
import { createSortById } from '#common/shared/tool/sortArray';
import { HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { camelCase } from 'change-case-all';
import { type ClsService } from 'nestjs-cls';
import type { AbstractClass, CamelCase, Class, LiteralUnion } from 'type-fest';
import { type FirstArrayElement } from 'type-fest/source/internal';
import { type DataSource, type Repository, type SelectQueryBuilder, type UpdateResult } from 'typeorm';
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<TEntity extends IEntity, TAttribute extends IAttributeEntity>
  implements IAbstractRepository<TEntity>
{
  protected readonly _repository: Repository<TEntity>;
  protected readonly alias: LiteralUnion<Extract<CE_TABLE_INFO, `${string}_as`>, `${string}_as`>;
  protected readonly draft: TDraft<TEntity>;
  protected readonly entity: AbstractClass<TEntity>;
  protected readonly attribute: AbstractClass<TAttribute>;
  protected readonly attributeKeys: string[];
  protected readonly clsService?: ClsService;
  protected readonly errorCodeMap?: Partial<Record<HttpStatus, string>>;

  constructor({
    alias,
    attribute,
    clsService,
    dataSource,
    draft,
    entity,
    errorCodeMap,
  }: {
    alias: TAlias;
    attribute: Class<TAttribute>;
    clsService?: ClsService;
    dataSource: DataSource;
    draft: TDraft<TEntity>;
    entity: AbstractClass<TEntity>;
    errorCodeMap?: Partial<Record<HttpStatus, string>>;
  }) {
    this._repository = dataSource.getRepository(entity);
    this.alias = alias;
    this.attribute = attribute;
    this.attributeKeys = Object.getOwnPropertyNames(new attribute()); // as Array<keyof TAttribute>;
    this.clsService = clsService;
    this.draft = draft;
    this.entity = entity;
    this.errorCodeMap = errorCodeMap;
  }

  get repository(): Repository<TEntity> {
    return this._repository;
  }

  // SECTION - 단건
  /**
   * 단건 조회 QueryBuilder
   * * 조건에 대한 검증
   * * condition 중 id, uuid 에 대한 queryBuilder 생성
   * * withDeleted 적용
   * * 기본 정렬 id DESC 적용
   */
  findQueryBuilder = (args: { condition: Record<string, unknown>; extra?: TExtra }) => {
    const { condition } = args;

    // null 값에 대해서는 IS NULL, IS NOT NULL 등을 사용하기에 값으로 null을 넣지는 않을 것 으로 보인다
    if (isEmpty(condition) || Object.values(condition).every((cond) => isEmpty(cond))) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    const findQueryBuilder = this.repository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC');
    withDeleted({ ...args, queryBuilder: findQueryBuilder, alias: this.alias });

    if ('id' in condition && isNotEmpty(condition.id) && typeof condition.id === 'string') {
      findQueryBuilder.andWhere(`${this.alias}.id = :id`, { id: condition.id });
    }
    if ('uuid' in condition && isNotEmpty(condition.uuid) && typeof condition.uuid === 'string') {
      findQueryBuilder.andWhere(`${this.alias}.uuid = :uuid`, { uuid: condition.uuid });
    }

    return findQueryBuilder;
  };

  find: IAbstractRepository<TEntity>['find'] = async (args) => {
    const findQueryBuilder = this.findQueryBuilder(args);

    return await findQueryBuilder.getOne();
  };

  findOrFail: IAbstractRepository<TEntity>['findOrFail'] = async (args) => {
    const entity = await this.find(args);

    if (entity == null) {
      throw new NotFoundException({
        errorCode: this.errorCodeMap?.[HttpStatus.NOT_FOUND] ?? CE_ERROR_CODE.COMMON.NOT_FOUND,
      });
    }

    return entity;
  };

  async create(
    args: FirstArrayElement<Parameters<IAbstractRepository<TEntity>['create']>>,
  ): Promise<Awaited<ReturnType<IAbstractRepository<TEntity>['create']>>> {
    // 값 필터링: id 제외
    const value = Object.fromEntries(
      Object.entries({
        ...args.value,
        createdByUserUuid: createdByUserUuid({ value: args.value, userUuid: this.clsService?.get('userUuid') }),
        updatedByUserUuid: updatedByUserUuid({ value: args.value, userUuid: this.clsService?.get('userUuid') }),
      }).filter(([key, val]) => key !== 'id' && this.attributeKeys.includes(key) && val !== undefined),
    ) as typeof args.value;

    const draftEntity = this.draft(value);

    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .values(draftEntity as unknown as QueryDeepPartialEntity<TEntity>)
      .updateEntity(false)
      .execute();

    return {
      id: getInsertId(insertResult),
      uuid: draftEntity.uuid,
      insertResult,
    };
  }

  async update<TCondition extends Pick<TEntity, 'id'> | Pick<TEntity, 'uuid'>>(args: {
    condition: TCondition;
    value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<
    TCondition & {
      updateResult?: UpdateResult;
    }
  > {
    const { condition } = args;

    const argsValue = {
      ...args.value,
      updatedByUserUuid: updatedByUserUuid({ value: args.value, userUuid: this.clsService?.get('userUuid') }),
    };

    if (
      Object.values(condition).every((cond) => isEmpty(cond)) ||
      Object.values(argsValue).every((val) => val === undefined) // null 값 허용되어서 undefined 만 체크
    ) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    // 값 필터링: id, uuid 제외
    const value = Object.fromEntries(
      Object.entries(argsValue).filter(
        ([key, val]) => key !== 'id' && key !== 'uuid' && this.attributeKeys.includes(key) && val !== undefined, // null 값 허용되어서 undefined 만 체크
      ),
    );

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({ ...condition, ...value } as QueryDeepPartialEntity<TEntity>)
      .where((qb) => {
        if ('id' in condition && isEmpty(condition.id) === false) {
          qb.andWhere(`id = :id`, { id: condition.id });
        }
        if ('uuid' in condition && isEmpty(condition.uuid) === false) {
          qb.andWhere(`uuid = :uuid`, { uuid: condition.uuid });
        }
      })
      .updateEntity(false)
      .execute();

    return {
      ...args.condition,
      updateResult,
    };
  }

  remove: IAbstractRepository<TEntity>['remove'] = async (args) => {
    const { condition } = args;

    if (Object.values(condition).every((cond) => isEmpty(cond))) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    const setValue = Object.fromEntries(
      Object.entries(
        this.attributeKeys.includes('updatedByUserUuid')
          ? {
              ...args.value,
              isDeleted: isNotEmpty(args.value) && 'isDeleted' in args.value ? args.value.isDeleted : true,
              deletedAt: isNotEmpty(args.value) && 'deletedAt' in args.value ? args.value.deletedAt : new Date(),
              updatedByUserUuid: updatedByUserUuid({
                value: args.value ?? {},
                userUuid: this.clsService?.get('userUuid'),
              }),
            }
          : {
              ...args.value,
              isDeleted: isEmpty(args.value) === false && 'isDeleted' in args.value ? args.value.isDeleted : true,
              deletedAt: isEmpty(args.value) === false && 'deletedAt' in args.value ? args.value.deletedAt : new Date(),
            },
      ).filter(([_key, val]) => val != null),
    ) as unknown as QueryDeepPartialEntity<TEntity>;

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set(setValue)
      .where((qb) => {
        if ('id' in condition && isNotEmpty(condition.id)) {
          qb.andWhere(`id = :id`, { id: condition.id });
        }
        if ('uuid' in condition && isNotEmpty(condition.uuid)) {
          qb.andWhere(`uuid = :uuid`, { uuid: condition.uuid });
        }
      })
      .execute();

    return { updateResult };
  };

  async exist<TCondition extends Pick<TEntity, 'id'> | Pick<TEntity, 'uuid'>>(args: {
    condition: TCondition;
  }): Promise<
    TCondition & {
      existed: boolean;
    }
  > {
    const existQueryBuilder = this.findQueryBuilder(args);

    const { condition } = args;
    const existed = await existQueryBuilder.getExists();

    return { ...condition, existed };
  }
  // !SECTION

  // SECTION - 다건
  /**
   * 다건 조회 QueryBuilder
   * * 조건에 대한 검증
   * * condition 중 ids, uuids 에 대한 queryBuilder 생성
   * * withDeleted 적용
   * * 기본 정렬 id DESC 적용
   */
  findManyQueryBuilder = (args: { condition: Record<string, unknown>; extra?: TExtra }) => {
    const { condition } = args;

    // NOTE: 다건 조회시 조건이 없는 경우도 있음
    // if (Object.values(condition).every((cond) => isEmpty(cond))) {
    //   throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    // }

    const findManyQueryBuilder = this.repository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC');
    withDeleted({ ...args, queryBuilder: findManyQueryBuilder, alias: this.alias });

    if ('ids' in condition && Array.isArray(condition.ids) && isNotEmpty(condition.ids)) {
      findManyQueryBuilder.andWhere(`${this.alias}.id IN (:...ids)`, { ids: condition.ids });
    }
    if ('uuids' in condition && Array.isArray(condition.uuids) && isNotEmpty(condition.uuids)) {
      findManyQueryBuilder.andWhere(`${this.alias}.uuid IN (:...uuids)`, { uuids: condition.uuids });
    }

    return findManyQueryBuilder;
  };

  findMany: IAbstractRepository<TEntity>['findMany'] = async (args) => {
    const findManyQueryBuilder = this.findManyQueryBuilder(args);

    return await findManyQueryBuilder.getMany();
  };

  createMany: IAbstractRepository<TEntity>['createMany'] = async (args) => {
    const { value: argsValue } = args;

    if (isEmpty(argsValue) || argsValue.every((val) => isEmpty(val))) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    // 값 필터링: id 제외
    const value = argsValue.map((val) =>
      Object.fromEntries(
        Object.entries({
          ...val,
          createdByUserUuid: createdByUserUuid({ value: val, userUuid: this.clsService?.get('userUuid') }),
          updatedByUserUuid: updatedByUserUuid({ value: val, userUuid: this.clsService?.get('userUuid') }),
        }).filter(([key, val]) => key !== 'id' && this.attributeKeys.includes(key) && val != null),
      ),
    ) as unknown as Array<Partial<TEntity>>;

    const draftEntities = value.map(this.draft);

    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .values(draftEntities as QueryDeepPartialEntity<TEntity>)
      .updateEntity(false)
      .execute();

    return {
      uuids: draftEntities.map((entity) => entity.uuid),
      insertResult,
    };
  };

  updateMany: IAbstractRepository<TEntity>['updateMany'] = async (args) => {
    const { condition, value: argsValue } = args as
      | {
          condition: { withoutUuids: Array<TEntity['uuid']> };
          value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
        }
      | {
          condition: { ids: Array<TEntity['id']> } | { uuids: Array<TEntity['uuid']> };
          value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
        }; // override 된 타입들를 다시 정의, 아니면 args의 타입이 any가 됨

    if (
      Object.values(condition).every((cond) => isEmpty(cond)) ||
      Object.values(argsValue).every((val) => val === undefined) // null 값 허용되어서 undefined 만 체크
    ) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    // 값 필터링: id, uuid 제외
    const value = Object.fromEntries(
      Object.entries({
        ...argsValue,
        updatedByUserUuid: updatedByUserUuid({ value: argsValue, userUuid: this.clsService?.get('userUuid') }),
      }).filter(([key, val]) => key !== 'id' && key !== 'uuid' && this.attributeKeys.includes(key) && val != null),
    );

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set(value as QueryDeepPartialEntity<TEntity>)
      .where((qb) => {
        if ('ids' in condition && Array.isArray(condition.ids) && isEmpty(condition.ids) === false) {
          qb.andWhere(`id IN (:...ids)`, { ids: condition.ids });
        }
        if ('uuids' in condition && Array.isArray(condition.uuids) && isEmpty(condition.uuids) === false) {
          qb.andWhere(`uuid IN (:...uuids)`, { uuids: condition.uuids });
        }
        if (
          'withoutUuids' in condition &&
          Array.isArray(condition.withoutUuids) &&
          isEmpty(condition.withoutUuids) === false
        ) {
          qb.andWhere(`uuid NOT IN (:...withoutUuids)`, { withoutUuids: condition.withoutUuids });
        }
      })
      .updateEntity(false)
      .execute();

    return {
      ...args.condition,
      updateResult,
    };
  };

  removeMany: IAbstractRepository<TEntity>['removeMany'] = async (args) => {
    const { condition } = args;

    if (Object.values(condition).every((cond) => isEmpty(cond))) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    const setValue = Object.fromEntries(
      Object.entries(
        this.attributeKeys.includes('updatedByUserUuid')
          ? {
              ...args.value,
              isDeleted: isEmpty(args.value) === false && 'isDeleted' in args.value ? args.value.isDeleted : true,
              deletedAt: isEmpty(args.value) === false && 'deletedAt' in args.value ? args.value.deletedAt : new Date(),
              updatedByUserUuid: updatedByUserUuid({ value: args.value, userUuid: this.clsService?.get('userUuid') }),
            }
          : {
              ...args.value,
              isDeleted: isEmpty(args.value) === false && 'isDeleted' in args.value ? args.value.isDeleted : true,
              deletedAt: isEmpty(args.value) === false && 'deletedAt' in args.value ? args.value.deletedAt : new Date(),
            },
      ).filter(([_key, val]) => val != null),
    ) as unknown as QueryDeepPartialEntity<TEntity>;

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set(setValue)
      .where((qb) => {
        if ('ids' in condition && Array.isArray(condition.ids) && isEmpty(condition.ids) === false) {
          qb.andWhere(`id IN (:...ids)`, { ids: condition.ids });
        }
        if ('uuids' in condition && Array.isArray(condition.uuids) && isEmpty(condition.uuids) === false) {
          qb.andWhere(`uuid IN (:...uuids)`, { uuids: condition.uuids });
        }
        if (
          'withoutUuids' in condition &&
          Array.isArray(condition.withoutUuids) &&
          isEmpty(condition.withoutUuids) === false
        ) {
          qb.andWhere(`uuid NOT IN (:...withoutUuids)`, { withoutUuids: condition.withoutUuids });
        }
      })
      .execute();

    return { updateResult };
  };

  // method로 해놓지 않으면 자식 클래스에서 호출할 수 없음
  async upsertMany(
    args: FirstArrayElement<Parameters<IAbstractRepository<TEntity>['upsertMany']>>,
  ): Promise<Awaited<ReturnType<IAbstractRepository<TEntity>['upsertMany']>>> {
    const { overwrite, value } = args;

    if (isEmpty(overwrite) || isEmpty(value) || value.every((val) => isEmpty(val))) {
      throw new InternalServerErrorException({ errorCode: CE_ERROR_CODE.COMMON.INTERNAL_SERVER_ERROR });
    }

    const draftEntities = value.map(this.draft);

    const insertResult = await this.repository
      .createQueryBuilder(this.alias)
      .insert()
      .values(draftEntities as QueryDeepPartialEntity<TEntity>)
      .orUpdate(
        overwrite,
        ['uuid'], // conflict_target: update/insert를 구분하기 위해서 사용하는 unique index 컬럼 이름 목록
      )
      .updateEntity(false)
      .execute();

    return {
      // uuids: draftEntities.map((entity) => entity.uuid),
      insertResult,
    };
  }
  // !SECTION

  // SECTION - 검색
  protected searchQueryBuilder(): SelectQueryBuilder<TEntity> {
    const searchQueryBuilder = this._repository.createQueryBuilder(this.alias);

    return searchQueryBuilder;
  }

  /** 기본 검색 쿼리 */
  protected readonly defaultSearchQueryRecord = {
    ...getSearchQueryRecord<
      TEntity,
      FirstArrayElement<Parameters<IAbstractRepository<TEntity>['search']>>['condition']
    >(),
  } as const;

  /** 검색 쿼리 */
  protected searchQueryRecord(): Record<
    string,
    (args: {
      condition: FirstArrayElement<Parameters<IAbstractRepository<TEntity>['search']>>['condition'];
      extra?: { now?: Date } | undefined;

      alias: LiteralUnion<Extract<CE_TABLE_INFO, `${string}_as`>, `${string}_as`>;
      searchQueryBuilder: SelectQueryBuilder<TEntity>;
    }) => SelectQueryBuilder<TEntity>
  > {
    return {};
  }

  /** clone 이 필요한 검색 쿼리 */
  protected readonly searchCloneQueryRecord = {
    ...getSearchCloneQueryRecord<
      TEntity,
      FirstArrayElement<Parameters<IAbstractRepository<TEntity>['search']>>['sort']
    >(),
  } as const;

  protected async executeSearchQuery<TPagination extends ISearchPaginationBaseDto = ISearchPaginationBaseDto>(args: {
    pagination: TPagination;
    totalCountSearchQueryBuilder: SelectQueryBuilder<TEntity>; // 전체 갯수 검색 쿼리 빌러
    sortSearchQueryBuilder: SelectQueryBuilder<TEntity>; // 정렬이 적용된 쿼리 빌더
  }): Promise<{
    totalCount: number;
    entities: TEntity[];
  }> {
    const { totalCount, entities } = await executeSearchQuery({ ...args, alias: this.alias });

    return { totalCount, entities };
  }

  protected getMeta<
    TMeta = ISearchMetaBaseDto,
    TArgs extends ISearchPaginationBaseDto & {
      totalCount: number;
    } = ISearchPaginationBaseDto & {
      totalCount: number;
    },
  >(args: TArgs): TMeta {
    const { limit, page, totalCount } = args;

    return {
      limit,
      page,
      totalCount,
    } as TMeta;
  }

  protected aggregateOrderStatusCount<TIncludeUnion extends string = string>(args: {
    statusCounts: Array<{
      status: TIncludeUnion;
      count: number;
    }>;
  }): Record<'total' | CamelCase<TIncludeUnion>, number> {
    const { statusCounts } = args;

    const statusCount = {
      total: BigNumber.sum(...statusCounts.map((statusCount) => statusCount.count)).toNumber(),

      ...statusCounts.reduce(
        (statusCounts, statusCount) => {
          const searchStatus = camelCase(statusCount.status) as CamelCase<typeof statusCount.status>;
          statusCounts[searchStatus] = BigNumber(statusCount.count).toNumber();

          return statusCounts;
        },
        {} as Record<CamelCase<TIncludeUnion>, number>,
      ),
    };

    return statusCount;
  }

  async search<
    TMeta = ISearchMetaBaseDto,
    TCondition extends ISearchConditionBaseDto = ISearchConditionBaseDto,
    TSort extends Array<`${string}:${'ASC' | 'DESC'}`> | undefined = ISearchSortBaseDto['sortBy'],
    TIncludeUnion extends string = string,
    TPagination extends ISearchPaginationBaseDto = ISearchPaginationBaseDto,
  >(args: {
    condition: TCondition;
    pagination: TPagination;
    sort?: TSort;
    extra?: TExtra;
    include?: TInclude<TIncludeUnion>;
  }): Promise<{ entities: TEntity[]; meta: TMeta }> {
    // step 1. 검색 쿼리 빌더 생성
    const searchQueryBuilder = this.searchQueryBuilder();

    // step 2. 검색 쿼리 조건 적용
    Object.values({
      ...this.defaultSearchQueryRecord,
      ...this.searchQueryRecord,
    }).forEach((searchQuery) => searchQuery({ ...args, alias: this.alias, searchQueryBuilder }));

    // step 3. 검색 쿼리 분기 처리
    // step 3.1. 정렬 조건 추가
    const sortSearchQueryBuilder = searchQueryBuilder.clone();
    this.searchCloneQueryRecord.sortBy({
      sort: args.sort,
      alias: this.alias,
      searchQueryBuilder: sortSearchQueryBuilder,
    });

    // step 4. 검색 쿼리 실행
    const { totalCount, entities: searchedEntities } = await this.executeSearchQuery<TPagination>({
      pagination: args.pagination,
      totalCountSearchQueryBuilder: searchQueryBuilder,
      sortSearchQueryBuilder,
    });

    // step 5. 검색 검증
    const ids = searchedEntities.map((entity) => entity.id);
    const meta = this.getMeta<TMeta, TPagination & { totalCount: number }>({ ...args.pagination, totalCount });

    if (ids.length > 0 === false) {
      return { entities: [], meta };
    }

    const findManyArgs = {
      // NOTE: 조회를 id 기준으로 다시 하는 이유는 left join 한 테이블들에 조건을
      // 걸었을시 해당 조건에 맞는 relation 테이블의 raw 정보만 조회 되기 때문에
      // 누락된 정보가 있을 수 있다. 그렇기 때문에 id 기준으로 다시 조회를 한다.
      condition: { ids },
      extra: args.extra,
      include: args.include,
    };

    const entities = await this.findMany({ ...findManyArgs });

    return {
      entities: entities.sort(createSortById(ids)),
      meta,
    };
  }
  // !SECTION
}
