import { type IFileMetadataDto, type TFile } from '#storage/dto/req/file.dto.type';

export interface ICreateFileDto {
  /** 파일 메타데이터 목록 */
  metadatas: Array<IFileMetadataDto>;

  /** 파일 목록 */
  files: Array<TFile>;
}
