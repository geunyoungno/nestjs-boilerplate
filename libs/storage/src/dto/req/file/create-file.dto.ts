import { IMemoryStorageFile } from '#framework/file-upload/storage/memory-storage.type';
import { type ICreateFileBaseDto } from '#storage/dto/req/file/create-file.dto.type';
import { FileMetadataBaseDto } from '#storage/dto/res/file/file.dto';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class CreateFileBaseDto implements Pick<ICreateFileBaseDto, 'metadatas'> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetadataBaseDto)
  // controller 에서 UsePipes를 사용해서 변환해 보았지만, Dto 쪽을 먼저 validation 하는지 되지를 검증에 실패하였다.
  @Transform((args: TransformFnParams) => {
    // NOTE: 개행문자가 포함된 문자로 오기 때문에 변환해 준다.
    const replacedValue = `[${`${args.value}`.replace(/\n|\r|\s*/g, '')}]`;
    return JSON.parse(replacedValue);
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  metadatas!: FileMetadataBaseDto[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  files!: IMemoryStorageFile[];
}
