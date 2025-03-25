import { getMultipartRequest } from '#framework/file-upload/multipart/request';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const UploadedFiles = createParamDecorator(
  async (
    _data: unknown,
    ctx: ExecutionContext,
  ): Promise<Record<string, IStorageFile[]> | IStorageFile[] | undefined> => {
    const req = getMultipartRequest(ctx.switchToHttp());

    return req?.storageFiles;
  },
);
