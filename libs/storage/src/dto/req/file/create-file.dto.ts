import { type ICreateFileDomainDto } from '#storage/dto/req/file/create-file.dto.type';
import { FileMetadataDomainDto } from '#storage/dto/res/file/file.dto';
import { type MemoryStorageFile } from '@gersur/nest-file-fastify';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class CreateFileDomainDto implements Pick<ICreateFileDomainDto, 'metadatas'> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetadataDomainDto)
  // controller 에서 UsePipes를 사용해서 변환해 보았지만, Dto 쪽을 먼저 validation 하는지 되지를 검증에 실패하였다.
  @Transform((args) => {
    // NOTE: 개행문자가 포함된 문자로 오기 때문에 변환해 준다.
    const replacedValue = `[${args.value.replace(/\n|\r|\s*/g, '')}]`;
    return JSON.parse(replacedValue);
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  metadatas!: FileMetadataDomainDto[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  files!: MemoryStorageFile[];
}
