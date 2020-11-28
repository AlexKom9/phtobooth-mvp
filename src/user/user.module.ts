import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtStrategy } from '../auth/jwt.stratagy';
import { FacebookApiModule } from '../facebook-api/facebook-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FacebookApiModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
