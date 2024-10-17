import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/database/typeorm.config';
import { AppConfigModule } from './config/app.config';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { HttpCustomModule } from './shared/http/http.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    HttpCustomModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
