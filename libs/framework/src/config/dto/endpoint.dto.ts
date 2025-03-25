import { CE_ENDPOINT_KEY } from '#framework/config/const-enum/CE_ENDPOINT_KEY';
import { type IEndpointConfig } from '#framework/config/dto/endpoint.dto.type';
import { Type } from 'class-transformer';
import { IsUrl, ValidateNested } from 'class-validator';

class EndpointConfigDto implements IEndpointConfig {
  @IsUrl()
  url!: string;
}

export class EndpointDto implements Record<CE_ENDPOINT_KEY, IEndpointConfig> {
  @ValidateNested()
  @Type(() => EndpointConfigDto)
  cdn!: EndpointConfigDto;
}
