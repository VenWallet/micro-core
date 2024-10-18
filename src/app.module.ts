import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app.config';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { HttpCustomModule } from './shared/http/http.module';
import { DatabaseConfig } from './config/database/typeorm.config';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig.getDataSourceOptions()),
    HttpCustomModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
