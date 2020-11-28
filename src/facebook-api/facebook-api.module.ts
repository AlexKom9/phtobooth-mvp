import { Module } from '@nestjs/common';
import { FacebookApiService } from './facebook-api.service';

@Module({
  providers: [FacebookApiService],
  exports: [FacebookApiService]
})
export class FacebookApiModule {}
