import { ApiFilesBody, FilesBody } from '#common/decorator/files-body.decorator';
import { CreateFileDto } from '#nestjs-common/storage/dto/req/create-file.dto';
import { Controller, Post } from '@nestjs/common';

@Controller('files')
export class FileController {
  @Post('/')
  @ApiFilesBody()
  uploadFiles(@FilesBody() body: CreateFileDto) {
    return {
      filenames: body.metadatas.map((metadata) => metadata.filename),
    };
  }
}
