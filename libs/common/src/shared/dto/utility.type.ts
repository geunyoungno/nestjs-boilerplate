// SECTION - Object 관련 타입 유틸리티
/**
 * 추상 클래스 타입을 반환합니다.
 */
export type TAbstractClass<T = unknown, Args extends unknown[] = unknown[]> = abstract new (...args: Args) => T;

/**
 * 배열 값 타입을 반환합니다.
 */
export type TArrayValues<T extends readonly unknown[]> = T[number];

/**
 * 클래스 생성자 타입 정의
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TClass<TInstance, TArgs extends any[] = any[]> = new (...args: TArgs) => TInstance;

/**
 * 객체를 키와 값을 배열로 반환합니다.
 */
export type TEntire<TObject extends object> = Array<
  {
    [TKey in keyof TObject]: [TKey, TObject[TKey]];
  }[keyof TObject]
>;

/**
 * 객체의 키와 값을 배열로 반환합니다.
 */
export type TEntries<T> = Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

/**
 * 배열의 첫 번째 요소 타입을 반환합니다.
 */
export type TFirstArrayElement<T extends readonly unknown[]> = T extends readonly [infer First, ...unknown[]]
  ? First
  : never;

/**
 * Map의 키 타입을 반환합니다.
 */
export type TMapKey<TMap extends Map<string, unknown>> = TMap extends Map<infer TKey, unknown> ? TKey : never;

/**
 * Map의 값 타입을 반환합니다.
 */
export type TMapValue<TMap extends Map<string, unknown>> = TMap extends Map<unknown, infer TValue> ? TValue : never;

/**
 * 두 객체를 병합합니다.
 */
export type TMerge<T, U> = Omit<T, keyof U> & U;

/**
 * 모든 타입의 모든 키가 NonNullable 한 타입을 반환합니다.
 */
export type TNonNullableObject<TObject extends object> = {
  [TKey in keyof TObject]: NonNullable<TObject[TKey]>;
};

/**
 * package.json 타입 정의
 */
export type TPackageJson = {
  version: string;
};

/**
 * 특정 키만 NonNullable 한 타입을 반환합니다.
 */
export type TPickNonNullable<TObject extends object, TKey extends keyof TObject> = TNonNullableObject<
  Pick<TObject, TKey>
>;

/**
 * 특정 키만 Partial 한 타입을 반환합니다.
 */
export type TPickPartial<TObject extends object, TKey extends keyof TObject> = Partial<Pick<TObject, TKey>>;

/**
 * 특정 키를 필수로 변경합니다.
 */
export type TSetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * 객체의 값 타입을 반환합니다.
 */
export type TValueOf<TObject extends object> = TObject[keyof TObject];
// !SECTION

// SECTION - String 변환 및 조작 관련 타입 유틸리티
/**
 * CamelCase 문자열 변환
 */
export type TCamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<TCamelCase<Tail>>}`
  : S;

/**
 * LiteralUnion 타입을 반환합니다.
 */
// 내부 브랜딩용(편집기 힌트 유지용)
type TBrand<T extends string> = { readonly __brand?: T };

/**
 * LiteralUnion
 * - 리터럴 T는 유지(자동완성 제공)
 * - 기본 타입 U도 허용하되, 브랜딩으로 리터럴 자동완성을 우선
 * - 기본값 U=string
 */
export type TLiteralUnion<T extends U, U = string> = T | (U & TBrand<'LiteralUnionFallback'>);

/**
 * PascalCase 문자열 변환
 */
export type TPascalCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Capitalize<Head>}${TPascalCase<Tail>}`
  : Capitalize<S>;

/**
 * Replace 문자열 치환
 */
export type TReplace<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer Start}${From}${infer End}` ? `${Start}${To}${End}` : S;

/**
 * SnakeCase 문자열 변환
 */
export type TSnakeCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${TSnakeCase<Tail>}`
    : `${Lowercase<Head>}_${TSnakeCase<Tail>}`
  : S;

/**
 * Split 문자열 나누기
 */
export type TSplit<S extends string, Delimiter extends string> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...TSplit<Tail, Delimiter>]
  : [S];
// !SECTION
