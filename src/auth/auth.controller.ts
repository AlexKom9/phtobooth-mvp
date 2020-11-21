import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as request from 'request';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/facebook')
  async facebookLogin(@Query('access_token') accessToken): Promise<any> {
    try {
      const providerUserData: any = await this.verifyFBAccessToken(accessToken);
      const user = await this.authService.findOrCreate(providerUserData);

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

  async verifyFBAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      const proof = crypto
        .createHmac('sha256', process.env.APP_SECRET)
        .update(accessToken)
        .digest('hex');

      const url = `https://graph.facebook.com/me?access_token=${accessToken}&appsecret_proof=${proof}&fields=name,email,picture`;

      request(url, { json: true }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
}
