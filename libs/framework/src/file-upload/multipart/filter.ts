import { type TUploadFilterFile } from '#framework/file-upload/multipart/filter.type';
import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { BadRequestException } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

export const filterUpload = async (
  uploadOptions: TUploadOptions,
  req: FastifyRequest,
  file: TUploadFilterFile,
): Promise<boolean> => {
  if (uploadOptions.filter == null) {
    return true;
  }

  try {
    const res = await uploadOptions.filter(req, file);

    if (typeof res === 'string') {
      throw new BadRequestException(res);
    }

    return res;
  } catch (error) {
    await uploadOptions.storage?.removeFile(file, true);

    throw error;
  }
};
