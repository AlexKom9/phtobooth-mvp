import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async findOrCreate({ id, email }, fbLongLivedAccessToken: string) {
    const user = await this.userService.findOne({ fbUserId: id });

    if (user) {
      return await this.userService.updateFbAccessToken({
        userId: user.id,
        fbLongLivedAccessToken,
      });
    }

    return this.userService.create({
      fbUserId: id,
      email,
      fbLongLivedAccessToken,
    });
  }

  async signUser(user: any): Promise<string> {
    const tokenPayload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(tokenPayload);
  }
}
