import { type IStorageFile } from '#framework/file-upload/storage/storage.type';

export interface IMemoryStorageFile extends IStorageFile {
  buffer: Buffer;
}
