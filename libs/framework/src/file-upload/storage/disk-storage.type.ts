import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';

export interface IDiskStorageFile extends IStorageFile {
  dest: string;
  filename: string;
  path: string;
}

export type TDiskStorageOptionHandler =
  | ((file: MultipartFile, req: FastifyRequest) => Promise<string> | string)
  | string;

export interface IDiskStorageOptions {
  dest?: TDiskStorageOptionHandler;
  filename?: TDiskStorageOptionHandler;
  removeAfter?: boolean;
}
