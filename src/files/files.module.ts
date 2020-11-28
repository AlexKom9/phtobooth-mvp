import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from './public-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
