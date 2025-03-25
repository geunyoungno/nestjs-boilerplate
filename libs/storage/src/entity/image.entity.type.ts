import { type IAttributeEntity, type IRelationEntity } from '#common/adaptor/database/entity/entity.type';
import type IUserImageLinkageEntity from '#user/entity/user-image-linkage.entity.type';

export interface IImageAttributeEntity extends IAttributeEntity {
  /** 이미지 id, 내부용 */
  id: string;

  /** 이미지 고유 uuid, 외부용 */
  uuid: string;

  /** 원본 이미지 이름 */
  originalName: string;

  /** 확장자 */
  extension: string;

  /**
   * 파일 크기
   * * 바이트 단위
   */
  size: number;

  /** 해상도 가로, 너비 */
  width: number | null;

  /** 해상도 세로, 높이 */
  height: number | null;

  /** 저장 경로 */
  storagePath: string;

  /** 썸네일 저장 경로 */
  thumbnailStoragePath: string | null;
}

export interface IImageRelationEntity extends IRelationEntity {
  /** 사용자 이미지 연계 목록 */
  userImageLinkages: IUserImageLinkageEntity[];
}

/** 이미지 */
export interface IImageEntity extends IImageAttributeEntity, IImageRelationEntity {}
