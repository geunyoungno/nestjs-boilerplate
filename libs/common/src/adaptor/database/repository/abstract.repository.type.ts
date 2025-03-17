import { type CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { type ISearchMetaBaseDto } from '#common/adaptor/database/dto/res/search.dto.type';
import { type IAttributeEntity, type IRelationEntity } from '#common/adaptor/database/entity/entity.type';
import {
  type ISearchConditionBaseDto,
  type ISearchPaginationBaseDto,
  type ISearchSortBaseDto,
} from '#common/shared/dto/req/search.dto.type';
import { type LiteralUnion, type SnakeCase } from 'type-fest';
import { type InsertResult, type ObjectLiteral, type UpdateResult } from 'typeorm';

export type TInclude<TKey extends string = string> = Partial<Record<TKey, boolean>> | undefined;

export type TJoinMethod = 'leftJoin' | 'leftJoinAndSelect';
export const defaultJoinMethod: TJoinMethod = 'leftJoinAndSelect';

export type TAlias = LiteralUnion<`${CE_TABLE_INFO}_as`, `${string}_as`>;

export type TExtra =
  | {
      /** 삭제된 데이터 포함 여부 */
      withDeleted?: boolean;
      /** 현재 시간 */
      now?: Date;
    }
  | undefined;

export interface IEntity extends ObjectLiteral, IAttributeEntity, IRelationEntity {
  id: string;
  uuid: string;
}

/** 엔티티 생성 시 기본값 설정 */
export type TDraft<TEntity extends IAttributeEntity> = (
  args?: Partial<Omit<TEntity, 'id'>> & {
    extra?: Pick<NonNullable<TExtra>, 'now'>;
  },
) => Omit<TEntity, 'id'>;

export type TOverwrite<TAttribute extends IEntity = IEntity> = SnakeCase<
  Extract<keyof Omit<TAttribute, 'id' | 'uuid'>, string>
>;

export interface IAbstractRepository<TEntity extends IEntity> {
  // SECTION - 단건
  /** 단건 조회 */
  find<TCondition extends Pick<TEntity, 'uuid'> | Pick<TEntity, 'id'>>(args: {
    condition: TCondition;
    extra?: TExtra;
  }): Promise<TEntity | null>;

  findOrFail<TCondition extends Pick<TEntity, 'uuid'> | Pick<TEntity, 'id'>>(args: {
    condition: TCondition;
    extra?: TExtra;
  }): Promise<TEntity>;

  /** 단건 생성 */
  create(args: { value: Partial<Omit<TEntity, 'id'>> }): Promise<
    Pick<TEntity, 'id' | 'uuid'> & {
      insertResult?: InsertResult;
    }
  >;

  /** 단건 수정 */
  update<TCondition extends Pick<TEntity, 'id'> | Pick<TEntity, 'uuid'>>(args: {
    condition: TCondition;
    value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<
    TCondition & {
      updateResult?: UpdateResult;
    }
  >;

  /** 단건 삭제 */
  remove<TCondition extends Pick<TEntity, 'id'> | Pick<TEntity, 'uuid'>>(args: {
    condition: TCondition;
    value?: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<{
    updateResult: UpdateResult;
  }>;

  exist<TCondition extends Pick<TEntity, 'id'> | Pick<TEntity, 'uuid'>>(args: {
    condition: TCondition;
    extra?: TExtra;
  }): Promise<TCondition & { existed: boolean }>;
  // !SECTION

  // SECTION - 다건
  /** 다건 조회 */
  findMany<TCondition extends { uuids: Array<TEntity['uuid']> } | { ids: Array<TEntity['id']> }>(args: {
    condition: TCondition;
    extra?: TExtra;
  }): Promise<TEntity[]>;
  findMany(args: { condition: Record<string, unknown>; extra?: TExtra }): Promise<TEntity[]>;

  /** 다건 생성 */
  createMany(args: { value: Array<Partial<Omit<TEntity, 'id'>>> }): Promise<
    {
      uuids: Array<TEntity['uuid']>;
    } & {
      insertResult?: InsertResult;
    }
  >;

  /** 다건 수정 */
  updateMany<TCondition extends { withoutUuids: Array<TEntity['uuid']> }>(args: {
    condition: TCondition;
    value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<
    TCondition & {
      updateResult?: UpdateResult;
    }
  >;
  updateMany<TCondition extends { ids: Array<TEntity['id']> } | { uuids: Array<TEntity['uuid']> }>(args: {
    condition: TCondition;
    value: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<
    TCondition & {
      updateResult?: UpdateResult;
    }
  >;

  /** 다건 삭제 */
  removeMany<
    TCondition extends {
      productId: string;
    }, // 여기 condition 만 AbstractRepository 에서 미사용
  >(args: {
    condition: TCondition;
    value?: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<{
    updateResult: UpdateResult;
  }>;
  removeMany<
    TCondition extends
      | {
          ids: Array<TEntity['id']>;
        }
      | {
          uuids: Array<TEntity['uuid']>;
        }
      | {
          withoutUuids: Array<TEntity['uuid']>;
        },
  >(args: {
    condition: TCondition;
    value?: Partial<Omit<TEntity, 'id' | 'uuid'>>;
  }): Promise<{
    updateResult: UpdateResult;
  }>;

  upsertMany<TValue extends Array<Partial<TEntity>>>(args: {
    overwrite: Array<LiteralUnion<TOverwrite<TEntity>, string>>; // 테이블의 필드명이 class의 필드명과 다른 경우들도 있어서 string 으로 처리
    value: TValue;
  }): Promise<{
    insertResult: InsertResult;
  }>;
  // !SECTION

  // SECTION - 검색
  search<
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
  }): Promise<{
    entities: TEntity[];
    meta: TMeta;
  }>;
  // !SECTION
}
