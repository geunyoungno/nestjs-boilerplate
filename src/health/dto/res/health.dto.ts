import { type IHealthDto } from '#health/dto/res/health.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class HealthDto implements IHealthDto {
  @ApiProperty()
  @IsString()
  runMode: string;

  @ApiProperty()
  @IsISO8601()
  timestamp: string;

  constructor(args: IHealthDto) {
    this.runMode = args.runMode;
    this.timestamp = new Date(args.timestamp).toISOString();
  }
}
