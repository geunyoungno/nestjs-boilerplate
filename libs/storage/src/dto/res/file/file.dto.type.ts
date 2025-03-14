import { type CE_FILE_KIND } from '#common/shared/const-enum/CE_FILE_KIND';

/**
 * 파일
 *
 * @nozzleIgnore
 * @asType string
 * @format binary
 */
export type TFile = string;

export interface IFileMetadataBaseDto {
  /**
   * 파일 종류
   */
  kind: CE_FILE_KIND;

  /**
   * 파일 종류 id
   */
  kindId: string;

  /**
   * 파일명, file 과 매칭시키기 위한 정보
   */
  filename: string;
}
