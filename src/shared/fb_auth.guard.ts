// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//
//     if (!request.queryParams.access_token) {
//       return false;
//     }
//
//     request.user = await this.validateAccessToken(
//       request.headers.authorization,
//     );
//     return true;
//   }
//
//   async validateAccessToken(auth: string) {
//
//     fb.api
//   }
//   //   if (auth.split(' ')[0] !== 'Bearer') {
//   //     throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
//   //   }
//   //   const token = auth.split(' ')[1];
//   //   try {
//   //     return await jwt.verify(token, process.env.SECRET);
//   //   } catch (err) {
//   //     const message = 'Token error: ' + (err.message || err.name);
//   //     throw new HttpException(message, HttpStatus.FORBIDDEN);
//   //   }
//   // }
// }
