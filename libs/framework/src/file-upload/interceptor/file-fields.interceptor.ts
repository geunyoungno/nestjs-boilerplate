import { handleMultipartFileFields, uploadFieldsToMap } from '#framework/file-upload/multipart/handler/file-fields';
import {
  type IUploadField,
  type TUploadFieldMapEntry,
} from '#framework/file-upload/multipart/handler/file-fields.type';
import { transformUploadOptions } from '#framework/file-upload/multipart/options';
import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { getMultipartRequest } from '#framework/file-upload/multipart/request';
import { type CallHandler, type ExecutionContext, mixin, type NestInterceptor, type Type } from '@nestjs/common';
import { type Observable, tap } from 'rxjs';

export function FileFieldsInterceptor(uploadFields: IUploadField[], options?: TUploadOptions): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    private readonly options: TUploadOptions;

    private readonly fieldsMap: Map<string, TUploadFieldMapEntry>;

    constructor() {
      this.options = transformUploadOptions(options) as TUploadOptions;
      this.fieldsMap = uploadFieldsToMap(uploadFields);
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
      const ctx = context.switchToHttp();
      const req = getMultipartRequest(ctx);

      const { body, files, remove } = await handleMultipartFileFields(req, this.fieldsMap, this.options);

      req.body = body;
      req.storageFiles = files;

      return next.handle().pipe(tap(remove));
    }
  }

  const Interceptor = mixin(MixinInterceptor);

  return Interceptor;
}
