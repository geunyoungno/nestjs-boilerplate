import { ApiFilesBody } from '#common/decorator/files-body.decorator';
import { CreateFileDto } from '#nestjs-common/storage/dto/req/create-file.dto';
import { UploadedFiles, type MemoryStorageFile } from '@gersur/nest-file-fastify';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('files')
export class FileController {
  @Post('/')
  @ApiFilesBody()
  uploadFile(@UploadedFiles() { files }: { files: MemoryStorageFile[] }, @Body() body: CreateFileDto) {
    console.log('uploadFile', {
      files,
      body,
    });

    return {};
  }
}
