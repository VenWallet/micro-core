import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app.config';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { HttpCustomModule } from './shared/http/http.module';
import { DatabaseConfig } from './config/database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MovementModule } from './modules/movement/movement.module';
import { MailModule } from './shared/mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig.getDataSourceOptions()),
    HttpCustomModule,
    AuthModule,
    UserModule,
    MovementModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
