import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookApiService } from '../facebook-api/facebook-api.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly facebookApiService: FacebookApiService,
  ) {}
  @Get('/facebook')
  async facebookLogin(@Query('access_token') accessToken): Promise<any> {
    try {
      const providerUserData: any = await this.facebookApiService.verifyFBAccessToken(
        accessToken,
      );

      const fbLongLivedAccessToken: any = await this.facebookApiService.getLongLiveUserAccessToken(
        accessToken,
      );

      // console.log('providerUserData ->', JSON.parse(providerUserData));

      const user = await this.authService.findOrCreate(
        JSON.parse(providerUserData),
        fbLongLivedAccessToken,
      );

      return {
        ok: true,
        userId: user.id,
        token: await this.authService.signUser(user),
      };
    } catch (e) {
      console.warn(e);
      throw new HttpException(`Please login`, HttpStatus.UNAUTHORIZED);
    }
  }
}
