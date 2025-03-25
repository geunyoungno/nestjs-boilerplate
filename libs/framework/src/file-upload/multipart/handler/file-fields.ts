import { removeStorageFiles } from '#framework/file-upload/multipart/file';
import { filterUpload } from '#framework/file-upload/multipart/filter';
import {
  type IUploadField,
  type TUploadFieldMapEntry,
} from '#framework/file-upload/multipart/handler/file-fields.type';
import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { getParts } from '#framework/file-upload/multipart/request';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { type MultipartFile } from '@fastify/multipart';
import { BadRequestException } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

export const uploadFieldsToMap = (uploadFields: IUploadField[]) => {
  const map = new Map<string, TUploadFieldMapEntry>();

  uploadFields.forEach(({ name, ...opts }) => {
    map.set(name, { maxCount: 1, ...opts });
  });

  return map;
};

export const handleMultipartFileFields = async (
  req: FastifyRequest,
  fieldsMap: Map<string, TUploadFieldMapEntry>,
  options: TUploadOptions,
) => {
  const parts = getParts(req, options);
  const body: Record<string, unknown> = {};

  const files: Record<string, IStorageFile[]> = {};

  const removeFiles = async (error?: boolean) => {
    const allFiles = ([] as IStorageFile[]).concat(...Object.values(files));
    return await removeStorageFiles(options.storage!, allFiles, error);
  };

  try {
    for await (const part of parts) {
      if (part.file) {
        const fieldOptions = fieldsMap.get(part.fieldname);

        if (fieldOptions == null) {
          throw new BadRequestException(`Field ${part.fieldname} doesn't accept files`);
        }

        if (files[part.fieldname] == null) {
          files[part.fieldname] = [];
        }

        if (files[part.fieldname].length + 1 > fieldOptions.maxCount) {
          throw new BadRequestException(`Field ${part.fieldname} accepts max ${fieldOptions.maxCount} files`);
        }

        const file = await options.storage!.handleFile(<MultipartFile>part, req);

        if (await filterUpload(options, req, file)) {
          files[part.fieldname].push(file);
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
    files,
    remove: () => removeFiles(),
  };
};
