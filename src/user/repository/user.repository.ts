import { getInsertId } from '#common/tool/getInsertId';
import { CE_TABLE_INFO } from '#nestjs-common/common/const-enum/CE_TABLE_INFO';
import { UserEntity } from '#user/entity/user.entity';
import { type IUserRepository } from '#user/repository/user.repository.type';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
  private table: string = CE_TABLE_INFO.USER;
  private alias: string = CE_TABLE_INFO.USER_ALIS;

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  selectQuery: IUserRepository['selectQuery'] = async (args) => {
    const userEntity = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .where(`${this.alias}.uuid = :uuid`, { uuid: args.uuid })
      .getOne();

    if (userEntity == null) {
      throw new NotFoundException(`${this.table} not found`);
    }

    return userEntity;
  };

  selectsQuery: IUserRepository['selectsQuery'] = async () => {
    const userEntities = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC')
      .getMany();

    return userEntities;
  };

  insertQuery: IUserRepository['insertQuery'] = async (args) => {
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
  };

  updateQuery: IUserRepository['updateQuery'] = async (args) => {
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
  };
}
