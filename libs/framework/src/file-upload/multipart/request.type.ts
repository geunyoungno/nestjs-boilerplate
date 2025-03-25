import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';
import { type RouteGenericInterface } from 'fastify/types/route';
import { type IncomingMessage, type Server } from 'http';

export type TFastifyMultipartRequest = FastifyRequest<RouteGenericInterface, Server, IncomingMessage> & {
  storageFile?: IStorageFile;
  storageFiles?: IStorageFile[] | Record<string, IStorageFile[]>;
};

export type TMultipartIterator = AsyncIterableIterator<MultipartFile>;
