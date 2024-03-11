import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { getInsertId } from '#common/tool/getInsertId';
import { UserEntity } from '#user/entity/user.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private alias: string = CE_TABLE_INFO.USER_ALIS;

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async read(args: { uuid: string }) {
    const userEntity = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .where(`${this.alias}.uuid = :uuid`, { uuid: args.uuid })
      .getOne();

    if (userEntity == null) {
      throw new NotFoundException();
    }

    return userEntity;
  }

  async create(args: { fullName: string; createdAt?: Date }) {
    const draftUser = UserEntity.draft(args);

    const insertResult = await this.userRepository
      .createQueryBuilder(this.alias)
      .insert()
      .values(draftUser)
      .updateEntity(false)
      .execute();

    const insertId = getInsertId(insertResult);

    return {
      id: insertId,
      uuid: draftUser.uuid,
    };
  }

  async update(args: { uuid: string; fullName?: string }) {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ fullName: args.fullName })
      .where(`uuid = :uuid`, { uuid: args.uuid })
      .updateEntity(false)
      .execute();

    return {
      uuid: args.uuid,
    };
  }

  async reads() {
    const userEntities = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC')
      .getMany();

    return userEntities;
  }
}
