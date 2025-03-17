import { type ColumnOptions } from 'typeorm';
import { type PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';

/** id, 내부용 */
export const id = {
  comment: 'id, 내부용',
  name: 'id',
  nullable: false,
  type: 'bigint',
  unsigned: true,
} as const satisfies ColumnOptions;

/** 관계 id 필드, 기본값이 있음 */
export const relationId = {
  comment: '관계 id',
  default: 0,
  name: 'relation_id',
  nullable: false,
  type: 'bigint',
  unsigned: true,
} as const satisfies ColumnOptions;

/** pk */
export const pk = ['increment', id] as const satisfies ['increment', PrimaryGeneratedColumnNumericOptions];

/** 고유 uuid, 외부용 */
export const uuid = {
  // unique 명을 지정 못해서 entity 에 직접 추가함
  // unique: true,
  comment: `고유 uuid, 외부용`,
  length: 64,
  name: 'uuid',
  type: 'varchar',
} as const satisfies ColumnOptions;

/** 관계 uuid, 외부용 */
export const relationUuid = {
  ...uuid,
  comment: '관계 uuid',
  default: '',
  name: 'relation_uuid',
} as const satisfies ColumnOptions;

/** 생성한 사용자 uuid */
export const createdByUserUuid = {
  ...relationUuid,
  comment: '생성한 사용자 uuid',
  name: 'created_by_user_uuid',
} as const satisfies ColumnOptions;

/** 최근 수정한 사용자 uuid */
export const updatedByUserUuid = {
  ...relationUuid,
  comment: '최근 수정한 사용자 uuid',
  name: 'updated_by_user_uuid',
} as const satisfies ColumnOptions;

/** 삭제한 사용자 uuid */
export const deletedByUserUuid = {
  ...relationUuid,
  comment: '삭제한 사용자 uuid',
  default: null,
  name: 'deleted_by_user_uuid',
  nullable: true,
} as const satisfies ColumnOptions;

const at = {
  comment: '시점',
  default: () => 'CURRENT_TIMESTAMP',
  type: 'datetime',
} as const satisfies ColumnOptions;

/** 생성 시점 */
export const createdAt = {
  ...at,
  comment: '생성 시점',
  name: 'created_at',
} as const satisfies ColumnOptions;

/** 최근 수정 시점 */
export const updatedAt = {
  ...at,
  comment: '최근 수정 시점',
  name: 'updated_at',
  onUpdate: 'CURRENT_TIMESTAMP',
} as const satisfies ColumnOptions;

/** 삭제 시점 */
export const deletedAt = {
  ...at,
  comment: '삭제 시점',
  default: null,
  name: 'deleted_at',
  nullable: true,
} as const satisfies ColumnOptions;

/** 삭제 여부 */
export const isDeleted = {
  comment: '삭제 여부',
  default: 0,
  name: 'is_deleted',
  type: 'tinyint',
  width: 1,
} as const satisfies ColumnOptions;
