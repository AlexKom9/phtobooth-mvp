import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
