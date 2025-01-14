import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { StatusEnum } from '../enums/status.enum';
import { MovementTypeEnum } from '../enums/movementType.enum';

@Entity('movements')
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({
    name: 'movement_type',
    type: 'enum',
    enum: MovementTypeEnum,
  })
  movementType!: MovementTypeEnum;

  @CreateDateColumn({ name: 'movement_date' })
  movementDate: Date;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status!: StatusEnum;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  amount?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column({ name: 'transaction_hash', nullable: true })
  transactionHash?: string;

  @Column({ name: 'from_account', nullable: true })
  fromAccount?: string;

  @Column({ name: 'to_account', nullable: true })
  toAccount?: string;

  @Column({ name: 'from_network', nullable: true })
  fromNetwork?: string;

  @Column({ name: 'to_network', nullable: true })
  toNetwork?: string;

  @Column({ type: 'text', nullable: true, name: 'error_details' })
  errorDetails?: string;
}
