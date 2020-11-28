import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CampaignEntity]),
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [CampaignController],
  providers: [UserService, CampaignService],
  exports: [UserService, CampaignService],
})
export class CampaignModule {}
