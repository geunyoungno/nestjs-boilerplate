import { type IMemoryStorageFile } from '#framework/file-upload/storage/memory-storage.type';
import { type IStorage } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest, type RouteGenericInterface } from 'fastify';
import { type IncomingMessage, type Server } from 'http';

export class MemoryStorage implements IStorage<IMemoryStorageFile> {
  public async handleFile(file: MultipartFile, _req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) {
    const buffer = await file.toBuffer();

    const { encoding, mimetype, fieldname } = file;

    return {
      buffer,
      size: buffer.length,
      encoding,
      mimetype,
      fieldname,
      originalFilename: file.filename,
    };
  }

  public async removeFile(file: IMemoryStorageFile) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (file as any)?.buffer;
  }
}
