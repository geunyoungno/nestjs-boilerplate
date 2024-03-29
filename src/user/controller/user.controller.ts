import { ApiOkJsend } from '#common/decorator/api-jsend.decorator';
import { CE_TABLE_INFO } from '#nestjs-common/common/const-enum/CE_TABLE_INFO';
import { CreateUserBodyDto } from '#nestjs-common/user/dto/req/create-user.dto';
import { ReadUserParamDto } from '#nestjs-common/user/dto/req/read-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '#nestjs-common/user/dto/req/update-user.dto';
import { UserDto } from '#nestjs-common/user/dto/res/user.dto';
import { UserService } from '#user/service/user.service';
import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 조회, 성공`,
    type: { user: UserDto },
  })
  @Get('/:userUuid')
  async find(@Param() param: ReadUserParamDto): Promise<{ user: UserDto }> {
    const userEntity = await this.userService.find({
      condition: {
        uuid: param.userUuid,
      },
    });

    return { user: new UserDto(userEntity) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회, 성공`,
    type: { users: [UserDto] },
  })
  @Get('/')
  async findMany(): Promise<{ users: Array<UserDto> }> {
    const userEntities = await this.userService.findMany();

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
    const userEntity = await this.userService.update({
      param,
      body,
    });

    return { user: new UserDto(userEntity) };
  }
}
