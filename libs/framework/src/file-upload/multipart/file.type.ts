import { type MultipartFile } from '@fastify/multipart';
import { type Readable } from 'stream';

export type TMultipartFile = Omit<MultipartFile, 'file'> & {
  value?: unknown;
  file: Readable & { truncated?: boolean };
};
