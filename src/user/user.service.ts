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
      return this.userRepository.findOne({
        where: { id },
        relations: ['campaigns'],
      });
    }

    if (fbUserId) {
      return this.userRepository.findOne({ where: { fbUserId } });
    }
  }

  async create({ fbUserId, email, fbLongLivedAccessToken }) {
    const user = await this.userRepository.create({ fbUserId, email, fbLongLivedAccessToken });
    await this.userRepository.save(user);
    return user;
  }

  async updateFbAccessToken({ userId, fbLongLivedAccessToken }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.fbLongLivedAccessToken = fbLongLivedAccessToken;

    await this.userRepository.save(user);

    return user;
  }
}
