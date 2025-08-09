import { CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import { TFirstArrayElement } from '#common/shared/dto/utility.type';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { type CreateUserBodyBaseDto } from '#user/dto/req/user/create-user.dto';
import { RemoveUserParamBaseDto } from '#user/dto/req/user/remove-user.dto';
import { SearchUserQueryBaseDto } from '#user/dto/req/user/search-user.dto';
import { type UpdateUserBodyBaseDto, type UpdateUserParamBaseDto } from '#user/dto/req/user/update-user.dto';
import { ISearchUserMetaBaseDto } from '#user/dto/res/user/search-user.dto.type';
import { UserEntity } from '#user/entity/user.entity';
import { UserRepository } from '#user/repository/user.repository';
import { IUserRepository } from '#user/repository/user.repository.type';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Transactional, runInTransaction } from 'typeorm-transactional';

@Injectable()
export class UserService {
  // 비밀번호 해시에 사용하는 salt
  private readonly saltOrRounds = 10;

  private readonly defaultLimit = 10;
  private readonly defaultPage = 1;

  constructor(private userRepository: UserRepository) {}

  async findOrFail(args: TFirstArrayElement<Parameters<UserRepository['findOrFail']>>) {
    return this.userRepository.findOrFail(args);
  }

  async findMany(args: TFirstArrayElement<Parameters<UserRepository['findMany']>>) {
    return this.userRepository.findMany(args);
  }

  async create(args: { body: CreateUserBodyBaseDto }): Promise<UserEntity> {
    // step 1. 이메일 중복 확인
    const previousUser = await this.userRepository.find({ condition: { email: args.body.email } });

    if (isNotEmpty(previousUser)) {
      throw new ConflictException({ errorCode: CE_ERROR_CODE.USER.ALREADY_EXIST });
    }

    // step 2. 사용자 생성
    const userResult = await runInTransaction(async () => {
      const userCreateValue = {
        fullName: args.body.fullName,
        email: args.body.email,
        password: await this.passwordHash(args.body.password),
      } satisfies TFirstArrayElement<Parameters<UserRepository['create']>>['value'];

      const userResult = await this.userRepository.create({ value: userCreateValue });

      return userResult;
    });

    // step 3. 최근 사용자 조회
    return this.findOrFail({ condition: { id: userResult.id, uuid: userResult.uuid } });
  }

  @Transactional()
  async update(args: { param: UpdateUserParamBaseDto; body: UpdateUserBodyBaseDto }): Promise<UserEntity> {
    // step 1. 사용자 조회
    const previousUser = await this.findOrFail({ condition: { uuid: args.param.userUuid } });

    // step 2. 사용자 수정
    const userUpdateValue = {
      ...args.body,
    } satisfies TFirstArrayElement<Parameters<UserRepository['update']>>['value'];

    await this.userRepository.update({
      condition: { uuid: args.param.userUuid },
      value: userUpdateValue,
    });

    // step 3. 최근 사용자 조회
    return this.findOrFail({ condition: { id: previousUser.id, uuid: previousUser.uuid } });
  }

  async remove(args: { param: RemoveUserParamBaseDto }): Promise<UserEntity> {
    // step 1. 사용자 조회
    const previousUser = await this.findOrFail({ condition: { uuid: args.param.userUuid } });

    // step 2. 사용자 삭제
    await this.userRepository.remove({ condition: { id: previousUser.id, uuid: previousUser.uuid } });

    // step 3. 이전 사용자 반환
    return previousUser;
  }

  async search(args: { query: SearchUserQueryBaseDto }): Promise<{
    users: UserEntity[];
    meta: ISearchUserMetaBaseDto;
  }> {
    const searched = await this.userRepository.search<
      Awaited<ReturnType<IUserRepository['search']>>['meta'],
      TFirstArrayElement<Parameters<IUserRepository['search']>>['condition'],
      TFirstArrayElement<Parameters<IUserRepository['search']>>['sort']
    >({
      condition: args.query,
      pagination: { page: args.query.page ?? this.defaultPage, limit: args.query.limit ?? this.defaultLimit },
      sort: args.query.sortBy,
      includes: args.query.includes,
    });

    return { users: searched.entities, meta: searched.meta };
  }

  async passwordHash(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    return hashedPassword;
  }

  async passwordCompare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
