import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { toPluralCamel } from '#common/adaptor/database/tool/convertCase';
import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { getHost } from '#common/shared/tool/getControllerHost';
import { CreateUserBodyDto } from '#external-api/user/dto/req/user/create-user.dto';
import { FindUserParamDto } from '#external-api/user/dto/req/user/find-user.dto';
import { RemoveUserParamDto } from '#external-api/user/dto/req/user/remove-user.dto';
import { SearchUserQueryDto } from '#external-api/user/dto/req/user/search-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '#external-api/user/dto/req/user/update-user.dto';
import { SearchUserDto, SearchUserMetaDto } from '#external-api/user/dto/res/user/search-user.dto';
import { UserDto } from '#external-api/user/dto/res/user/user.dto';
import { AllMethodRouteConstraints } from '#framework/decorator/controller/all-method.decorator';
import { ApiOkJsend } from '#framework/decorator/dto/api-jsend.decorator';
import { UserService } from '#user/service/user.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const tags = [toPluralCamel(CE_TABLE_INFO.USER)];
const summary = CE_TABLE_INFO.USER_SUMMARY;

@AllMethodRouteConstraints({ host: getHost(CE_MASHUP.EXTERNAL) })
@ApiTags(...tags)
@Controller({
  host: getHost(CE_MASHUP.EXTERNAL),
  path: ['users'].join('/'),
  version: '1',
})
export class ExternalUserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: `${summary} 단건 조회`, tags })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${summary} 단건 조회, 성공`,
    type: { user: UserDto },
  })
  @Get('/:userUuid')
  async find(@Param() param: FindUserParamDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.findOrFail({ condition: { uuid: param.userUuid } });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${summary} 다건 조회`, tags })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${summary} 다건 조회, 성공`,
    type: { users: [UserDto] },
  })
  @Get('/')
  async findMany(): Promise<{ users: UserDto[] }> {
    const userEntities = await this.userService.findMany({ condition: {} });

    return { users: userEntities.map((userEntity) => new UserDto(userEntity)) };
  }

  @ApiOperation({ summary: `${summary} 단건 생성`, tags })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${summary} 단건 생성, 성공`,
    type: { user: UserDto },
  })
  @Post('/')
  async create(@Body() body: CreateUserBodyDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.create({ body });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${summary} 단건 수정`, tags })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${summary} 단건 수정, 성공`,
    type: { user: UserDto },
  })
  @Put('/:userUuid')
  async update(@Param() param: UpdateUserParamDto, @Body() body: UpdateUserBodyDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.update({ param, body });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${summary} 단건 삭제`, tags })
  @ApiOkJsend({ status: HttpStatus.OK, description: `${summary} 단건 삭제, 성공`, type: { user: UserDto } })
  @Delete('/:userUuid')
  async remove(@Param() param: RemoveUserParamDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.remove({ param });

    return { user: new UserDto(userEntity) };
  }

  @Get('/search')
  @ApiOperation({ summary: `${summary} 검색`, tags })
  @ApiOkJsend({ type: { users: [SearchUserDto], meta: SearchUserMetaDto } })
  async search(@Query() query: SearchUserQueryDto) {
    const { users, meta } = await this.userService.search({ query });

    return { users: users.map((user) => new SearchUserDto(user)), meta: new SearchUserMetaDto(meta) };
  }
}
