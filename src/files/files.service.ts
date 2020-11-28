import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './public-file.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3({});

    console.log(
      'process.env.AWS_PUBLIC_BUCKET_NAME ->',
      process.env.AWS_PUBLIC_BUCKET_NAME,
    );

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

      const newFile = this.publicFilesRepository.create({
        key: uploadResult.Key,
        url: uploadResult.Location,
      });

      await this.publicFilesRepository.save(newFile);

      return newFile;
    } catch (e) {
      console.warn(e);
    }
  }
}
