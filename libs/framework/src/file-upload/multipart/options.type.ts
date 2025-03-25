import { type TUploadFilterHandler } from '#framework/file-upload/multipart/filter.type';
import { type IStorage, type IStorageFile } from '#framework/file-upload/storage/storage.type';
import type busboy from 'busboy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TUploadOptions<TStorageFile extends IStorageFile = any> = busboy.BusboyConfig & {
  dest?: string;
  storage?: IStorage<TStorageFile>;
  filter?: TUploadFilterHandler;
};
