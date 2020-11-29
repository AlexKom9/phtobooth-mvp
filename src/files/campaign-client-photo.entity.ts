import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampaignEntity } from '../campaign/campaign.entity';

@Entity('campaign_client_photo')
export class CampaignClientPhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @ManyToOne(
    () => CampaignEntity,
    type => type.photos,
  )
  @JoinTable()
  campaign: CampaignEntity;
}
