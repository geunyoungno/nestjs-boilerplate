import { type IFileMetadataBaseDto, type TFile } from '#storage/dto/res/file/file.dto.type';

export interface ICreateFileBaseDto {
  /** 파일 메타데이터 목록 */
  metadatas: IFileMetadataBaseDto[];

  /** 파일 목록 */
  files: TFile[];
}
