import { UserRepository } from '#user/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async read(args: { uuid: string }) {
    return this.userRepository.selectQuery(args);
  }

  async create(args: { fullName: string; createdAt?: Date }) {
    const userResult = await this.userRepository.insertQuery(args);

    return this.userRepository.selectQuery(userResult);
  }

  async update(args: { uuid: string; fullName?: string }) {
    const userResult = await this.userRepository.updateQuery(args);

    return this.userRepository.selectQuery(userResult);
  }

  async reads() {
    return this.userRepository.selectsQuery();
  }
}
