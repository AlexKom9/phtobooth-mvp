import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './interfaces/campaign.dto';
import { Repository } from 'typeorm';
import { CampaignEntity } from './campaign.entity';
import { UserEntity } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from '../files/files.service';
import { makeWatchRun } from 'ts-loader/dist/watch-run';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly filesService: FilesService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateCampaignDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    const campaign = this.campaignRepository.create({
      user,
      name: data.name,
      fbPageId: data.fbPageId,
    });

    await this.campaignRepository.save(campaign);

    return campaign;
  }

  async update(id, data: CreateCampaignDto): Promise<any> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
    });

    Object.entries(data).map(([key, value]) => {
      campaign[key] = value;
    });

    await this.campaignRepository.save(campaign);

    return campaign;
  }

  async delete(id): Promise<any> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
    });

    await this.campaignRepository.delete(id);

    return campaign;
  }

  async campaignGuestLink(id: number) {
    const campaign = await this.findOne(id);

    const token = this.jwtService.sign({ id });

    if (campaign) {
      return `/guest?campaign_id=${id}&token=${token}`;
    } else {
      throw new Error(`No campaign with id: ${id}`);
    }
  }

  async findOne(id: any) {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['photos'],
    });

    return campaign;
  }

  async addClientPhoto(
    campaignId: number,
    imageBuffer: Buffer,
    filename: string,
  ) {
    const campaign = await this.findOne(campaignId);

    return await this.filesService.uploadCampaignClientPhoto(
      imageBuffer,
      filename,
      campaign,
    );
  }
}
