import { type IResHealthDto } from '#health/dto/res-health.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class ResHealthDto implements IResHealthDto {
  @ApiProperty()
  @IsString()
  runMode: string;

  @ApiProperty()
  @IsISO8601()
  timestamp: string;

  constructor(args: IResHealthDto) {
    this.runMode = args.runMode;
    this.timestamp = new Date(args.timestamp).toISOString();
  }
}
