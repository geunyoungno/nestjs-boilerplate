import { filterUpload } from '#framework/file-upload/multipart/filter';
import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { getParts } from '#framework/file-upload/multipart/request';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { BadRequestException } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

export const handleMultipartSingleFile = async (req: FastifyRequest, fieldname: string, options: TUploadOptions) => {
  const parts = getParts(req, options);
  const body: Record<string, unknown> = {};

  // eslint-disable-next-line no-restricted-syntax
  let file: IStorageFile | undefined = undefined;

  const removeFiles = async (error?: boolean) => {
    if (file == null) return;
    await options.storage!.removeFile(file, error);
  };

  try {
    for await (const part of parts) {
      if (part.file) {
        if (part.fieldname !== fieldname) {
          throw new BadRequestException(`Field ${part.fieldname} doesn't accept file`);
        } else if (file != null) {
          throw new BadRequestException(`Field ${fieldname} accepts only one file`);
        }

        const _file = await options.storage!.handleFile(<MultipartFile>part, req);

        if (await filterUpload(options, req, _file)) {
          file = _file;
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

  return {
    body,
    file,
    remove: () => removeFiles(),
  };
};
