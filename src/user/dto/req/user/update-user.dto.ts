import { type IUpdateUserBodyDomainDto, type IUpdateUserParamDomainDto } from '#user/dto/req/user/update-user.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import * as uuid from 'uuid';

@Expose()
export class UpdateUserParamDomainDto implements IUpdateUserParamDomainDto {
  @ApiProperty({
    description: `사용자 고유번호`,
    type: 'string',
    format: 'uuid',
    example: uuid.v4(),
  })
  @IsUUID(4)
  userUuid!: string;
}

@Expose()
export class UpdateUserBodyDomainDto implements IUpdateUserBodyDomainDto {
  @ApiProperty({
    description: `사용자 성명`,
    type: 'string',
    required: false,
    default: `사용자 성명`,
  })
  @IsString()
  @IsOptional()
  fullName?: string;
}
