import { IResUserDto } from '#user/dto/interface/IResUserDto';
import IUserEntity from '#user/entity/interface/IUserEntity';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, IsUUID } from 'class-validator';

export class ResUserhDto implements IResUserDto {
  @ApiProperty()
  @IsUUID(4)
  uuid: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsISO8601()
  createdAt: Date;

  constructor(args: IResUserDto | IUserEntity) {
    this.uuid = args.uuid;
    this.fullName = args.fullName;
    this.createdAt = 'createdAt' in args ? new Date(args.createdAt) : new Date();
  }
}
