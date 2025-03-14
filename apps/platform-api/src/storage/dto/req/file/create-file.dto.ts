import { CreateFileBaseDto } from '#storage/dto/req/file/create-file.dto';
import { type ICreateFileBaseDto } from '#storage/dto/req/file/create-file.dto.type';

export class CreateFileDto extends CreateFileBaseDto implements Pick<ICreateFileBaseDto, 'metadatas'> {}
