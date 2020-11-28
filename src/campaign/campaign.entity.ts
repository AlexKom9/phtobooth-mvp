import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

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
}
