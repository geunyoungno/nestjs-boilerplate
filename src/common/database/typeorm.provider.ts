import { UserEntity } from '#user/entity/user.entity';
import { DataSource } from 'typeorm';

export const typeormProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 9301,
        username: 'root',
        password: 'testadmin',
        database: 'test',
        entities: [UserEntity],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
