import { type IStorage, type IStorageFile } from '#framework/file-upload/storage/storage.type';

export const removeStorageFiles = async (
  storage: IStorage,
  files?: Array<IStorageFile | undefined>,
  force?: boolean,
) => {
  if (files == null) {
    return;
  }

  await Promise.all(files.map((file) => file != null && storage.removeFile(file, force)));
};
