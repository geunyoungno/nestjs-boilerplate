import { type CE_TABLE_PLURAL } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { type TCamelCase, type TPascalCase } from '#common/shared/dto/utility.type';
import { camelCase, pascalCase } from 'change-case-all';
import pluralize from 'pluralize';

const customPascalMap = new Map<string, string>([['Oauth', 'OAuth']]);

/**
 * 파스칼 케이스로 변환한다
 * * Entity를 입력할 떄 사용한다
 * @param string
 * @returns
 */
export function toPascal<TStr extends string>(string: TStr): TPascalCase<TStr> {
  const pascaled = pascalCase(string) as TPascalCase<TStr>;

  if (customPascalMap.has(pascaled)) {
    return customPascalMap.get(pascaled) as TPascalCase<TStr>;
  }

  return pascaled;
}

/**
 * 카멜 케이스로 변환한다
 * * relation 필드를 입력할 때 사용한다
 * @param string
 * @returns
 */
export function toCamel<TStr extends string>(string: TStr): TCamelCase<TStr> {
  return camelCase(string) as TCamelCase<TStr>;
}
export const toPlural = <TStr extends `${string}${keyof typeof CE_TABLE_PLURAL}`>(
  singularString: TStr,
): `${string}${CE_TABLE_PLURAL}` => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const pluralString = pluralize(singularString);

  return pluralString;
};

export const toPluralCamel = <TStr extends `${string}${keyof typeof CE_TABLE_PLURAL}`>(
  singularString: TStr,
): TCamelCase<ReturnType<typeof toPlural>> => {
  const pluralString = toPlural(singularString);

  return toCamel(pluralString);
};
