import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CampaignEntity } from '../campaign/campaign.entity';
import * as crypto from 'crypto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  email: string;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'bigint' })
  fbUserId: number;

  @Column()
  fbLongLivedAccessToken: string;

  @OneToMany(
    () => CampaignEntity,
    type => type.user,
  )
  @JoinTable()
  campaigns: CampaignEntity[];

  get proof() {
    return crypto
      .createHmac('sha256', process.env.APP_SECRET)
      .update(this.fbLongLivedAccessToken)
      .digest('hex');
  }
}
