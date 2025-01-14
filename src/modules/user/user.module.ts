import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), NotificationModule],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
