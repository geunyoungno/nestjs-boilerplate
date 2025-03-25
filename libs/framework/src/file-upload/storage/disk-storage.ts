import {
  type IDiskStorageFile,
  type IDiskStorageOptions,
  type TDiskStorageOptionHandler,
} from '#framework/file-upload/storage/disk-storage.type';
import { type IStorage } from '#framework/file-upload/storage/storage.type';
import { getUniqueFilename } from '#framework/file-upload/tool/getUniqueFilename';
import { pathExists } from '#framework/file-upload/tool/pathExists';
import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest, type RouteGenericInterface } from 'fastify';
import fs from 'fs';
import { type IncomingMessage, type Server } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const executeStorageHandler = (file: MultipartFile, req: FastifyRequest, obj?: TDiskStorageOptionHandler) => {
  if (typeof obj === 'function') {
    return obj(file, req);
  }

  if (obj != null) return obj;

  return null;
};

const pump = promisify(pipeline);

export class DiskStorage implements IStorage<IDiskStorageFile, IDiskStorageOptions> {
  public readonly options?: IDiskStorageOptions;

  constructor(options?: IDiskStorageOptions) {
    this.options = options;
  }

  public async handleFile(file: MultipartFile, req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) {
    const filename = await this.getFilename(file, req, this.options?.filename);
    const dest = await this.getFileDestination(file, req, this.options?.dest);

    if ((await pathExists(dest)) === false) {
      await fs.promises.mkdir(dest, { recursive: true });
    }

    const path = join(dest, filename);
    const stream = fs.createWriteStream(path);

    await pump(file.file, stream);

    const { encoding, fieldname, mimetype } = file;

    return {
      size: stream.bytesWritten,
      dest,
      filename,
      originalFilename: file.filename,
      path,
      mimetype,
      encoding,
      fieldname,
    };
  }

  public async removeFile(file: IDiskStorageFile, force?: boolean) {
    if (this.options?.removeAfter == null && force == null) {
      return;
    }

    await fs.promises.unlink(file.path);
  }

  protected async getFilename(
    file: MultipartFile,
    req: FastifyRequest,
    obj?: TDiskStorageOptionHandler,
  ): Promise<string> {
    return executeStorageHandler(file, req, obj) ?? getUniqueFilename(file.filename);
  }

  protected async getFileDestination(
    file: MultipartFile,
    req: FastifyRequest,
    obj?: TDiskStorageOptionHandler,
  ): Promise<string> {
    return executeStorageHandler(file, req, obj) ?? tmpdir();
  }
}
