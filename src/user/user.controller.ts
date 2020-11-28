import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UserService } from './user.service';
import { FacebookApiService } from '../facebook-api/facebook-api.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly facebookApiService: FacebookApiService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async profile(@Param('id') id: string) {
    const user = await this.userService.findOne({
      id: Number(id),
    });

    const fbAccountData = await this.facebookApiService.getAccounts(
      user.fbLongLivedAccessToken,
    );

    return {
      ok: true,
      result: {
        user,
        fb: {
          accounts: fbAccountData,
        },
      },
    };
  }
}
