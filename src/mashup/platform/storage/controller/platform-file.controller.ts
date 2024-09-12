import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { getHost } from '#common/shared/tool/getControllerHost';
import { AllMethodRouteConstraints } from '#framework/decorator/all-method.decorator';
import { ApiFilesBody, FilesBody } from '#framework/decorator/files-body.decorator';
import { CreateFileDto } from '#mashup-api/platform/storage/dto/req/file/create-file.dto';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@AllMethodRouteConstraints({ host: getHost(CE_MASHUP.PLATFORM) })
@ApiTags('storages')
@Controller('files')
export class PlatformFileController {
  @Post('/')
  @ApiFilesBody()
  uploadFiles(@FilesBody() body: CreateFileDto) {
    return {
      filenames: body.metadatas.map((metadata) => metadata.filename),
    };
  }
}
