import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';

export interface IStorageFile {
  size: number;
  fieldname: string;
  encoding: string;
  mimetype: string;
  originalFilename: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IStorage<T extends IStorageFile = IStorageFile, K = any> {
  handleFile: (file: MultipartFile, req: FastifyRequest) => Promise<T>;

  removeFile: (file: T, force?: boolean) => Promise<void> | void;

  options?: K;
}
