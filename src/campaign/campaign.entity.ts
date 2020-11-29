import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CampaignClientPhotoEntity } from '../files/campaign-client-photo.entity';

@Entity('campaign')
export class CampaignEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  name: string;

  @Column()
  fbPageId: string;

  @ManyToOne(
    () => UserEntity,
    type => type.campaigns,
  )
  @JoinTable()
  user: UserEntity;

  @OneToMany(
    () => CampaignClientPhotoEntity,
    type => type.campaign,
  )
  @JoinTable()
  photos: CampaignClientPhotoEntity[];
}
