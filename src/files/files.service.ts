import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CampaignEntity } from '../campaign/campaign.entity';
import { CampaignClientPhotoEntity } from './campaign-client-photo.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(CampaignClientPhotoEntity)
    private campaignClientPhotoRepository: Repository<
      CampaignClientPhotoEntity
    >,
  ) {}

  private async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3({});

    try {
      const uploadResult = await s3
        .upload({
          Bucket: 'photobooth-public-bucket',
          Body: dataBuffer,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
          Key: `${uuid()}-${filename}`,
        })
        .promise();

      console.log('uploadResult ->', uploadResult);

      return uploadResult;
    } catch (e) {
      console.warn(e);
    }
  }

  async uploadCampaignClientPhoto(
    dataBuffer: Buffer,
    filename: string,
    campaign: CampaignEntity,
  ) {
    const uploadResult = await this.uploadPublicFile(dataBuffer, filename);

    const newFile = this.campaignClientPhotoRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
      campaign: campaign,
    });

    await this.campaignClientPhotoRepository.save(newFile);

    return newFile;
  }
}
