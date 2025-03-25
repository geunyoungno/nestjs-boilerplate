import { getMultipartRequest } from '#framework/file-upload/multipart/request';
import { type IStorageFile } from '#framework/file-upload/storage/storage.type';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const UploadedFile = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext): Promise<IStorageFile | undefined> => {
    const req = getMultipartRequest(ctx.switchToHttp());

    return req?.storageFile;
  },
);
