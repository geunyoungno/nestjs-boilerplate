import { ApiFilesBody, FilesBody } from '#framework/decorator/files-body.decorator';
import { CreateFileDto } from '#storage/dto/req/create-file.dto';
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
