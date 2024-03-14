import { type ColumnOptions } from 'typeorm';
import { type PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';

/** id, 내부용 */
export const id = [
  'increment',
  {
    type: 'bigint',
    name: 'id',
    comment: 'id, 내부용',
    unsigned: true,
  },
] as const satisfies ['increment', PrimaryGeneratedColumnNumericOptions];

/** 고유 uuid, 외부용 */
export const uuid = {
  type: 'varchar',
  name: 'uuid',
  length: 64,
  // unique 명을 지정 못해서 entity 에 직접 추가함
  // unique: true,
  comment: `고유 uuid, 외부용`,
} as const satisfies ColumnOptions;

/** 사용자 id */
export const userId = {
  type: 'bigint',
  name: 'user_id',
  comment: '사용자 id',
  unsigned: true,
} as const satisfies ColumnOptions;

/**
 * 입증 여부
 * * 0: 미입증
 * * 1: 입증
 */
export const isVerified = {
  type: 'tinyint',
  name: 'is_verified',
  width: 1,
  default: 0,
  comment: `입증 여부`,
} as const satisfies ColumnOptions;

/** 입증 시점 */
export const verifiedAt = {
  type: 'datetime',
  name: 'verified_at',
  nullable: true,
  comment: '입증 시점',
} as const satisfies ColumnOptions;

/** 생성 시점 */
export const createdAt = {
  type: 'datetime',
  name: 'created_at',
  default: () => 'CURRENT_TIMESTAMP',
  comment: '생성 시점',
} as const satisfies ColumnOptions;

/** 최근 수정 시점 */
export const updatedAt = {
  type: 'datetime',
  name: 'updated_at',
  default: () => 'CURRENT_TIMESTAMP',
  onUpdate: 'CURRENT_TIMESTAMP',
  comment: '최근 수정 시점',
} as const satisfies ColumnOptions;
