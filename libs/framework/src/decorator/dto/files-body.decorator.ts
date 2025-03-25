import { FileFieldsInterceptor } from '#framework/file-upload/interceptor/file-fields.interceptor';
import { MemoryStorage } from '#framework/file-upload/storage/memory-storage';
import { FileMetadataBaseDto } from '#storage/dto/res/file/file.dto';
import { UseInterceptors, applyDecorators, createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

// @ApiExtraModels(FileMetadataBaseDto)
// @ApiBody({
//   required: true,
//   // type: 'multipart/form-data',
//   schema: {
//     type: 'object',
//     properties: {
//       metadatas: {
//         type: 'array',
//         items: {
//           $ref: getSchemaPath(FileMetadataBaseDto),
//         },
//       },
//       files: {
//         type: 'array',
//         items: {
//           type: 'string',
//           format: 'binary',
//           description: '파일',
//         },
//         description: '파일',
//       },
//     },
//   },
// })
// @ApiConsumes('multipart/form-data')
// @UseInterceptors(
//   FileFieldsInterceptor([{ name: 'files', maxCount: 10 }], {
//     storage: new MemoryStorage(),
//   }),
// )
export const ApiFilesBody = () => {
  return applyDecorators(
    // api swagger
    ApiExtraModels(FileMetadataBaseDto),
    ApiBody({
      required: true,
      // type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          metadatas: {
            type: 'array',
            items: {
              $ref: getSchemaPath(FileMetadataBaseDto),
            },
          },
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
              description: '파일',
            },
            description: '파일',
          },
        },
      },
    }),
    ApiConsumes('multipart/form-data'),
    // validator
    UseInterceptors(
      FileFieldsInterceptor([{ name: 'files', maxCount: 10 }], {
        storage: new MemoryStorage(),
      }),
    ),
  );
};

export const FilesBody = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  req.body.files = req?.storageFiles['files'];

  return {
    ...req.body,
    ...req?.storageFiles,
  };
});
