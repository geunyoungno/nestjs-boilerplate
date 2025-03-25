import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { DiskStorage } from '#framework/file-upload/storage/disk-storage';
import { MemoryStorage } from '#framework/file-upload/storage/memory-storage';
import { type IMemoryStorageFile } from '#framework/file-upload/storage/memory-storage.type';

export const DEFAULT_UPLOAD_OPTIONS: Partial<TUploadOptions<IMemoryStorageFile>> = {
  storage: new MemoryStorage(),
};

export const transformUploadOptions = (options?: TUploadOptions) => {
  if (options == null) {
    return DEFAULT_UPLOAD_OPTIONS;
  }

  if (options.dest != null) {
    return {
      ...options,
      storage: new DiskStorage({
        dest: options?.dest,
        ...(options?.storage?.options ?? {}),
      }),
    };
  }

  return { ...DEFAULT_UPLOAD_OPTIONS, ...options };
};
