import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import PublicFile from '../files/public-file.entity';

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

  @OneToMany(() => PublicFile, type => type.key)
  @JoinTable()
  photos: string[];
}
