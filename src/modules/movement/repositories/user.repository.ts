import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { MovementEntity } from '../entities/movement.entity';
import { MovementDto } from '../dto/movement.dto';

@Injectable()
export class MovementRepository {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly repository: Repository<MovementEntity>,
  ) {}

  async save(entity: MovementEntity): Promise<MovementEntity> {
    return await this.repository.save(entity);
  }

  async create(movementDto: MovementDto): Promise<MovementEntity> {
    const newEntity = this.repository.create(movementDto);

    return await this.repository.save(newEntity);
  }

  async findByUserId(userId: string): Promise<MovementEntity[]> {
    return await this.repository.find({ where: { userId } });
  }

  async findAll(): Promise<MovementEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<MovementEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<MovementEntity>): Promise<void> {
    const updateResult = await this.repository.update({ id }, updateData);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Movement not found');
    }
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Movement not found');
    }
  }
}
