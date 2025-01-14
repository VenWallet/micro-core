import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { HttpCustomService } from 'src/shared/http/http.service';
import { MovementRepository } from './repositories/user.repository';
import { MovementDto } from './dto/movement.dto';
import { MovementEntity } from './entities/movement.entity';

@Injectable()
export class MovementService {
  constructor(private readonly movementRepository: MovementRepository) {}

  async create(createMovementDto: MovementDto): Promise<MovementEntity> {
    try {
      return await this.movementRepository.create(createMovementDto);
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findByUserId(userId: string): Promise<MovementEntity[]> {
    try {
      return await this.movementRepository.findByUserId(userId);
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findAll(): Promise<MovementEntity[]> {
    try {
      return await this.movementRepository.findAll();
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findOne(id: number): Promise<MovementEntity> {
    try {
      const movementFound = await this.movementRepository.findOne(id);

      if (!movementFound) {
        throw new NotFoundException('Movement not found');
      }

      return movementFound;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
