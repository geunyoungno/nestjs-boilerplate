import { type IFileMetadataDomainDto, type TFile } from '#storage/dto/res/file/file.dto.type';

export interface ICreateFileDomainDto {
  /** 파일 메타데이터 목록 */
  metadatas: Array<IFileMetadataDomainDto>;

  /** 파일 목록 */
  files: Array<TFile>;
}
