import { IResHealthDto } from '#health/dto/interface/IResHealthDto';
import { IsISO8601, IsString } from 'class-validator';

export class ResHealthDto implements IResHealthDto {
  @IsString()
  runMode: string;

  @IsISO8601()
  timestamp: string;

  constructor(args: IResHealthDto) {
    this.runMode = args.runMode;
    this.timestamp = new Date(args.timestamp).toISOString();
  }
}
