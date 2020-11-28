import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public_file')
class PublicFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;
}

export default PublicFile;
