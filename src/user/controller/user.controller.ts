import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { CreateUserBodyDto } from '#user/dto/create-user.dto';
import { ReadUserParamDto } from '#user/dto/read-user.dto';
import { ResUserhDto } from '#user/dto/res-user.dto';
import { UpdateUserBodyDto, UpdateUserParamDto } from '#user/dto/update-user.dto';
import { UserService } from '#user/user.service';
import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 조회`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 조회, 성공`,
    type: ResUserhDto,
  })
  @Get('/:userUuid')
  async readUser(@Param() param: ReadUserParamDto): Promise<ResUserhDto> {
    const userEntity = await this.userService.read({
      uuid: param.userUuid,
    });

    return new ResUserhDto(userEntity);
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 생성`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 생성, 성공`,
    type: ResUserhDto,
  })
  @Post('/')
  async createUser(@Body() body: CreateUserBodyDto): Promise<ResUserhDto> {
    const userResult = await this.userService.create({ ...body });

    const userEntity = await this.userService.read({
      uuid: userResult.uuid,
    });

    return new ResUserhDto(userEntity);
  }

  @ApiOperation({ summary: `${CE_TABLE_INFO.USER_SUMMARY} 생성`, tags: [CE_TABLE_INFO.USER] })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: `${CE_TABLE_INFO.USER_SUMMARY} 생성, 성공`,
    type: ResUserhDto,
  })
  @Put('/:userUuid')
  async updateUser(@Param() param: UpdateUserParamDto, @Body() body: UpdateUserBodyDto): Promise<ResUserhDto> {
    const userResult = await this.userService.update({ uuid: param.userUuid, ...body });

    const userEntity = await this.userService.read({
      uuid: userResult.uuid,
    });

    return new ResUserhDto(userEntity);
  }
}
