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

  async findByUserId(
    userId: string,
    filters: {
      status?: string;
      fromNetwork?: string;
      toNetwork?: string;
      fromCoin?: string;
      toCoin?: string;
      movementType?: string;
      currency?: string;
      fromAccount?: string;
      toAccount?: string;
      startDate?: string;
      endDate?: string;
    },
  ): Promise<MovementEntity[]> {
    const query = this.repository.createQueryBuilder('movement').where('movement.userId = :userId', {
      userId: userId,
    });

    if (filters.status) {
      query.andWhere('movement.status = :status', { status: filters.status });
    }

    if (filters.fromNetwork) {
      query.andWhere('movement.fromNetwork = :fromNetwork', { fromNetwork: filters.fromNetwork });
    }

    if (filters.toNetwork) {
      query.andWhere('movement.toNetwork = :toNetwork', { toNetwork: filters.toNetwork });
    }

    if (filters.fromCoin) {
      query.andWhere('movement.fromCoin = :fromCoin', { fromCoin: filters.fromCoin });
    }

    if (filters.toCoin) {
      query.andWhere('movement.toCoin = :toCoin', { toCoin: filters.toCoin });
    }

    if (filters.movementType) {
      query.andWhere('movement.movementType = :movementType', { movementType: filters.movementType });
    }

    if (filters.currency) {
      query.andWhere('movement.currency = :currency', { currency: filters.currency });
    }

    if (filters.fromAccount) {
      query.andWhere('movement.fromAccount = :fromAccount', { fromAccount: filters.fromAccount });
    }

    if (filters.toAccount) {
      query.andWhere('movement.toAccount = :toAccount', { toAccount: filters.toAccount });
    }

    if (filters.startDate && filters.endDate) {
      query.andWhere('movement.movementDate BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    } else if (filters.startDate) {
      query.andWhere('movement.movementDate >= :startDate', { startDate: filters.startDate });
    } else if (filters.endDate) {
      query.andWhere('movement.movementDate <= :endDate', { endDate: filters.endDate });
    }

    return await query.getMany();
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
