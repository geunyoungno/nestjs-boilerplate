import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { getHost } from '#common/shared/tool/getControllerHost';
import { CreateUserBodyDto } from '#external-api/user/dto/req/user/create-user.dto';
import { ReadUserParamDto } from '#external-api/user/dto/req/user/read-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '#external-api/user/dto/req/user/update-user.dto';
import { UserDto } from '#external-api/user/dto/res/user/user.dto';
import { AllMethodRouteConstraints } from '#framework/decorator/controller/all-method.decorator';
import { ApiOkJsend } from '#framework/decorator/dto/api-jsend.decorator';
import { UserService } from '#user/service/user.service';
import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@AllMethodRouteConstraints({ host: getHost(CE_MASHUP.EXTERNAL) })
@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class ExternalUserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 조회, 성공`,
    type: { user: UserDto },
  })
  @Get('/:userUuid')
  async find(@Param() param: ReadUserParamDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.find({ condition: { uuid: param.userUuid } });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회, 성공`,
    type: { users: [UserDto] },
  })
  @Get('/')
  async findMany(): Promise<{ users: UserDto[] }> {
    const userEntities = await this.userService.findMany({ condition: {} });

    return { users: userEntities.map((userEntity) => new UserDto(userEntity)) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 생성`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 생성, 성공`,
    type: { user: UserDto },
  })
  @Post('/')
  async create(@Body() body: CreateUserBodyDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.create({ body });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 수정`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 수정, 성공`,
    type: { user: UserDto },
  })
  @Put('/:userUuid')
  async update(@Param() param: UpdateUserParamDto, @Body() body: UpdateUserBodyDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.update({ param, body });

    return { user: new UserDto(userEntity) };
  }
}
