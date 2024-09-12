import { CreateFileDomainDto } from '#storage/dto/req/file/create-file.dto';
import { type ICreateFileDomainDto } from '#storage/dto/req/file/create-file.dto.type';

export class CreateFileDto extends CreateFileDomainDto implements Pick<ICreateFileDomainDto, 'metadatas'> {}
