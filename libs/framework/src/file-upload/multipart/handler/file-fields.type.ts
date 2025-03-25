export interface IUploadField {
  /**
   * Field name
   */
  name: string;
  /**
   * Max number of files in this field
   */
  maxCount?: number;
}

export type TUploadFieldMapEntry = Required<Pick<IUploadField, 'maxCount'>>;
