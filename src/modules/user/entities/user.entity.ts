import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { NetworksEnum } from '../enums/networks.enum';
import { IndexEnum } from '../enums/index.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  name!: string;
}
