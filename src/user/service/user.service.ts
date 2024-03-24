import { CE_TABLE_INFO } from '#nestjs-common/common/const-enum/CE_TABLE_INFO';
import { type CreateUserBodyDto } from '#nestjs-common/user/dto/req/create-user.dto';
import { type UpdateUserBodyDto, type UpdateUserParamDto } from '#nestjs-common/user/dto/req/update-user.dto';
import { UserRepository } from '#user/repository/user.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { type FirstArrayElement } from 'type-fest/source/internal';
import { Transactional, runInTransaction } from 'typeorm-transactional';

@Injectable()
export class UserService {
  // 비밀번호 해시에 사용하는 salt
  private readonly saltOrRounds = 10;

  constructor(private userRepository: UserRepository) {}

  /**
   * Entity가 nullable 인지 확인하고, 그렇지 않을 경우 반환
   */
  nonNullable<TEntity = Awaited<ReturnType<UserRepository['find']>>>(entity: TEntity): NonNullable<TEntity> {
    if (entity == null) {
      throw new NotFoundException(`${CE_TABLE_INFO.USER} not found`);
    }

    return entity;
  }

  async find(args: FirstArrayElement<Parameters<UserRepository['find']>>) {
    const user = await this.userRepository.find(args);

    return this.nonNullable(user);
  }

  async findMany() {
    return this.userRepository.findMany();
  }

  async create(args: { body: CreateUserBodyDto }) {
    const userEntity = await this.userRepository.find({
      condition: {
        email: args.body.email,
      },
    });

    if (userEntity != null) {
      throw new ConflictException();
    }

    const userResult = await runInTransaction(async () => {
      const userCreateValue = {
        fullName: args.body.fullName,
        email: args.body.email,
        password: await this.passwordHash(args.body.password),
      } satisfies FirstArrayElement<Parameters<UserRepository['create']>>['value'];
      const userResult = await this.userRepository.create({
        value: userCreateValue,
      });

      return userResult;
    });

    return await this.find({
      condition: {
        id: userResult.id,
      },
    });
  }

  @Transactional()
  async update(args: { param: UpdateUserParamDto; body: UpdateUserBodyDto }) {
    const userResult = await this.userRepository.update({
      condition: {
        uuid: args.param.userUuid,
      },
      value: args.body,
    });

    return this.find({
      condition: {
        uuid: userResult.uuid,
      },
    });
  }

  async passwordHash(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    return hashedPassword;
  }

  async passwordCompare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
