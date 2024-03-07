import { UserEntity } from '#user/entity/user.entity';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const userProvider: Provider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
  inject: ['DATA_SOURCE'],
};
