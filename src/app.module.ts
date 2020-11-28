import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { AppGateway } from './app.gateway';
import { FacebookApiModule } from './facebook-api/facebook-api.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'photo_booth',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migration/*.js'],
      cli: {
        migrationsDir: 'migration',
      },
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CampaignModule,
    FacebookApiModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
