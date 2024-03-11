import { type IResUserDto } from '#user/interface/IResUserDto';
import type IUserEntity from '#user/interface/IUserEntity';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';

export class ResUserDto implements IResUserDto {
  @ApiProperty()
  @IsUUID(4)
  uuid: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty({
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  createdAt?: Date;

  constructor(args: IResUserDto | IUserEntity) {
    this.uuid = args.uuid;
    this.fullName = args.fullName;
    this.createdAt = 'createdAt' in args ? new Date(args.createdAt) : undefined;
  }
}
