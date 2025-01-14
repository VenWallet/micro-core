import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementEntity } from './entities/movement.entity';
import { MovementService } from './movement.service';
import { MovementRepository } from './repositories/user.repository';
import { MovementController } from './movement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MovementEntity])],
  exports: [MovementService, MovementRepository],
  controllers: [MovementController],
  providers: [MovementService, MovementRepository],
})
export class MovementModule {}
