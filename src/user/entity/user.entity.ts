import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', engine: 'InnoDB' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'id',
  })
  id!: string;
}
