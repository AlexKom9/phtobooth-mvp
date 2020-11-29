import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignClientPhotoEntity } from './campaign-client-photo.entity';
import { CampaignEntity } from '../campaign/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignClientPhotoEntity, CampaignEntity]),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
