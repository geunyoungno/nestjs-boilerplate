import { ISearchMetaBaseDto } from '#common/shared/dto/req/search.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class SearchMetaBaseDto implements ISearchMetaBaseDto {
  @ApiProperty({
    description: '한 페이지당 보여줄 개수',
    maximum: 100,
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number;

  @ApiProperty({
    description: '현재 페이지',
    type: 'integer',
  })
  @IsInt()
  page: number;

  @ApiProperty({
    type: 'integer',
    description: '전체 개수',
  })
  @IsInt()
  totalCount: number;

  constructor(args: ISearchMetaBaseDto) {
    this.limit = args.limit;
    this.page = args.page;
    this.totalCount = args.totalCount;
  }
}
