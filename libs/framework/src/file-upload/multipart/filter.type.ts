import { type IDiskStorageFile } from '#framework/file-upload/storage/disk-storage.type';
import { type IMemoryStorageFile } from '#framework/file-upload/storage/memory-storage.type';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type FastifyRequest } from 'fastify';

export type TUploadFilterFile = IStorageFile | IDiskStorageFile | IMemoryStorageFile;

export type TUploadFilterHandler = (
  req: FastifyRequest,
  file: TUploadFilterFile,
) => Promise<boolean | string> | boolean | string;
