import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';
import * as crypto from 'crypto';

// const fetch = (url, options) =>
//   new Promise((resolve, reject) => {
//     request(url, { json: true, ...options }, (err, res, body) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(body);
//     });
//   });

@Injectable()
export class FacebookApiService {
  getFBAccessProof(accessToken) {
    return crypto
      .createHmac('sha256', process.env.APP_SECRET)
      .update(accessToken)
      .digest('hex');
  }

  async verifyFBAccessToken(accessToken) {
    return request({
      uri: `https://graph.facebook.com/me?access_token=${accessToken}&appsecret_proof=${this.getFBAccessProof(
        accessToken,
      )}&fields=name,email,picture`,
    });
  }

  async getAccounts(accessToken) {
    return request({
      uri: `https://graph.facebook.com/me/accounts?access_token=${accessToken}&appsecret_proof=${this.getFBAccessProof(
        accessToken,
      )}`,
    });
  }

  async getLongLiveUserAccessToken(accessToken) {
    const response: any = await fetch(
      `https://graph.facebook.com/${process.env.APP_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${accessToken}`,
    );

    return response.access_token;
  }

  async makePost({ accountId, caption, dataUrl, accountAccessToken }) {
    return request({
      uri: `https://graph.facebook.com/${accountId}/photos?access_token=${accountAccessToken}&appsecret_proof=${this.getFBAccessProof(
        accountAccessToken,
      )}`,
      method: 'POST',
      body: {
        caption,
        url: dataUrl,
      },
      json: true,
    });
  }
}
