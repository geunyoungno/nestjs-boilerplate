import { removeStorageFiles } from '#framework/file-upload/multipart/file';
import { filterUpload } from '#framework/file-upload/multipart/filter';
import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { getParts } from '#framework/file-upload/multipart/request';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';

export const handleMultipartAnyFiles = async (req: FastifyRequest, options: TUploadOptions) => {
  const parts = getParts(req, options);
  const body: Record<string, unknown> = {};

  const files: IStorageFile[] = [];

  const removeFiles = async (error?: boolean) => {
    return await removeStorageFiles(options.storage!, files, error);
  };

  try {
    for await (const part of parts) {
      if (part.file != null) {
        const file = await options.storage!.handleFile(<MultipartFile>part, req);

        if (await filterUpload(options, req, file)) {
          files.push(file);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body[part.fieldname] = (part as any).value;
      }
    }
  } catch (error) {
    await removeFiles(true);

    throw error;
  }

  return { body, files, remove: () => removeFiles() };
};
