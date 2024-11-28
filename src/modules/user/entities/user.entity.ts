import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { NetworksEnum } from '../enums/networks.enum';
import { IndexEnum } from '../enums/index.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  copydrive: string;

  @Column({ type: 'varchar', nullable: true })
  otp: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  otpExpiration: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
