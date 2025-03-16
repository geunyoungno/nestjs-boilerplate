import { type TAlias, type TExtra } from '#common/adaptor/database/repository/abstract.repository.type';
import isEmpty from '#common/shared/tool/isEmpty';
import { type ObjectLiteral, type SelectQueryBuilder } from 'typeorm';

/**
 * 삭제된 데이터 조회 여부에 따라 쿼리를 구성합니다.
 */
export const withDeleted = <TEntity extends ObjectLiteral>(args: {
  extra?: TExtra;
  queryBuilder: SelectQueryBuilder<TEntity>;
  alias?: TAlias;
}) => {
  // withDeleted 옵션이 true 로 주어진 경우, 삭제된 데이터도 조회한다.
  if ((args.extra?.withDeleted ?? false) === false) {
    args.queryBuilder.andWhere(
      `(${[args.alias, 'is_deleted'].filter((str): str is string => isEmpty(str) === false).join('.')} = false)`,
    );
  }

  return args.queryBuilder;
};

/**
 * 삭제된 데이터 조회 여부에 따라 조인 조건을 구성합니다.
 */
export const relationWithDeleted = (args: {
  extra?: TExtra;
  // leftJoin on 절의 조건
  alias?: TAlias;
  condition?: string;
  parameters?: ObjectLiteral;
}): [string | undefined, ObjectLiteral | undefined] => {
  // withDeleted 옵션이 true 로 주어진 경우, 삭제된 데이터도 조회한다.
  if ((args.extra?.withDeleted ?? false) === false) {
    const conditions = [
      args.condition,
      `(${[args.alias, 'is_deleted'].filter((str): str is string => isEmpty(str) === false).join('.')} = false)`,
    ].filter((str): str is string => isEmpty(str) === false);

    return [conditions.join(' AND '), args.parameters];
  }

  return [args.condition, args.parameters];
};
