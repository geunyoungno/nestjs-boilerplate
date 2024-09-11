import { CE_TABLE_INFO } from '#common/shared/const-enum/CE_TABLE_INFO';
import { getInsertId } from '#common/shared/tool/getInsertId';
import { UserEntity } from '#user/entity/user.entity';
import { type IUserRepository } from '#user/repository/user.repository.type';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, type Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  // private readonly table = CE_TABLE_INFO.USER;
  private readonly alias = CE_TABLE_INFO.USER_ALIAS;

  private userRepository: Repository<UserEntity>;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  find: IUserRepository['find'] = async (args) => {
    const { condition } = args;

    const selectQueryBuilder = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC');

    if ('uuid' in condition) {
      selectQueryBuilder.where(`${this.alias}.uuid = :uuid`, { uuid: condition.uuid });
    }
    if ('id' in condition) {
      selectQueryBuilder.where(`${this.alias}.id = :id`, { id: condition.id });
    }
    if ('email' in condition) {
      selectQueryBuilder.where(`${this.alias}.email = :email`, { email: condition.email });
    }

    const userEntity = await selectQueryBuilder.getOne();
    return userEntity;
  };

  findMany: IUserRepository['findMany'] = async () => {
    const userEntities = await this.userRepository
      .createQueryBuilder(this.alias)
      .select()
      .orderBy(`${this.alias}.id`, 'DESC')
      .getMany();

    return userEntities;
  };

  create: IUserRepository['create'] = async (args) => {
    const draftUser = UserEntity.draft(args.value);

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

  update: IUserRepository['update'] = async (args) => {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set(args.value)
      .where(`uuid = :uuid`, { uuid: args.condition.uuid })
      .updateEntity(false)
      .execute();

    return {
      uuid: args.condition.uuid,
    };
  };
}
