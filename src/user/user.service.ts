import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findOne({ fbUserId, id }: any) {
    if (id) {
      return this.userRepository.findOne({ where: { id } });
    }

    if (fbUserId) {
      return this.userRepository.findOne({ where: { fbUserId } });
    }
  }

  async create({ fbUserId, email }) {
    const user = await this.userRepository.create({ fbUserId, email });
    await this.userRepository.save(user);
    return user;
  }
}
