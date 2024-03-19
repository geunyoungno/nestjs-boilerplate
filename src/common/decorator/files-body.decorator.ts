import { FileMetadataDto } from '#nestjs-common/storage/dto/req/file.dto';
import { FileFieldsInterceptor, MemoryStorage } from '@gersur/nest-file-fastify';
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

// @ApiExtraModels(FileMetadataDto)
// @ApiBody({
//   required: true,
//   // type: 'multipart/form-data',
//   schema: {
//     type: 'object',
//     properties: {
//       metadatas: {
//         type: 'array',
//         items: {
//           $ref: getSchemaPath(FileMetadataDto),
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
    ApiExtraModels(FileMetadataDto),
    ApiBody({
      required: true,
      // type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          metadatas: {
            type: 'array',
            items: {
              $ref: getSchemaPath(FileMetadataDto),
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
