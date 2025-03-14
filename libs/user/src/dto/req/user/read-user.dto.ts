import { type IReadUserParamBaseDto } from '#user/dto/req/user/read-user.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Expose()
export class ReadUserParamBaseDto implements IReadUserParamBaseDto {
  @ApiProperty({
    description: `사용자 고유번호`,
    type: 'string',
    format: 'uuid',
  })
  @IsUUID(4)
  userUuid!: string;
}
