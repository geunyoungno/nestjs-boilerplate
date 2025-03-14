import { type IHealthBaseDto } from '#operation/dto/res/health/health.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class HealthBaseDto implements IHealthBaseDto {
  @ApiProperty()
  @IsString()
  runMode: string;

  @ApiProperty()
  @IsISO8601()
  timestamp: string;

  constructor(args: IHealthBaseDto) {
    this.runMode = args.runMode;
    this.timestamp = new Date(args.timestamp).toISOString();
  }
}
