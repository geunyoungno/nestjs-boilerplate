/** 기본 속성 엔티티 */
export interface IPrimaryAttributeEntity {
  /** 내부용 id */
  id: string;

  /** 외부용 uuid */
  uuid: string;
}

/** 메타 속성 엔티티 */
export interface IMetaAttributeEntity {
  /** 생성 시점 */
  createdAt: Date;

  /** 최근 수정 시점 */
  updatedAt: Date;

  /** 삭제 시점 */
  deletedAt: Date | null;

  /** 삭제 여부 */
  isDeleted: boolean;

  /** 생성한 사용자 uuid */
  createdBy: string;

  /** 최근 수정한 사용자 uuid */
  updatedBy: string;

  /** 삭제한 사용자 uuid */
  deletedBy: string | null;
}

/** 속성 엔티티 */
export interface IAttributeEntity extends IPrimaryAttributeEntity, IMetaAttributeEntity {}

/** 관계 엔티티 */
export interface IRelationEntity {}
