import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
