import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { ApiOkJsend } from '#common/decorator/api-ok-jsend.decorator';
import { CreateUserBodyDto } from '#user/dto/create-user.dto';
import { ReadUserParamDto } from '#user/dto/read-user.dto';
import { ResUserDto } from '#user/dto/res-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '#user/dto/update-user.dto';
import { UserService } from '#user/user.service';
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
    type: { user: ResUserDto },
  })
  @Get('/:userUuid')
  async read(@Param() param: ReadUserParamDto): Promise<{ user: ResUserDto }> {
    const userEntity = await this.userService.read({
      uuid: param.userUuid,
    });

    return { user: new ResUserDto(userEntity) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 목록 조회, 성공`,
    type: { users: [ResUserDto] },
  })
  @Get('/')
  async reads(): Promise<{ users: Array<ResUserDto> }> {
    const userEntities = await this.userService.reads();

    return { users: userEntities.map((userEntity) => new ResUserDto(userEntity)) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 생성`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 생성, 성공`,
    type: { user: ResUserDto },
  })
  @Post('/')
  async create(@Body() body: CreateUserBodyDto): Promise<{ user: ResUserDto }> {
    const userResult = await this.userService.create({ ...body });

    const userEntity = await this.userService.read({
      uuid: userResult.uuid,
    });

    return { user: new ResUserDto(userEntity) };
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 수정`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkJsend({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 수정, 성공`,
    type: { user: ResUserDto },
  })
  @Put('/:userUuid')
  async update(@Param() param: UpdateUserParamDto, @Body() body: UpdateUserBodyDto): Promise<{ user: ResUserDto }> {
    const userResult = await this.userService.update({ uuid: param.userUuid, ...body });

    const userEntity = await this.userService.read({
      uuid: userResult.uuid,
    });

    return { user: new ResUserDto(userEntity) };
  }
}
