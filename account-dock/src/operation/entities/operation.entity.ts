import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OperationType } from '../OperationTypeEnum';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: OperationType;

  @Column()
  value: number;

  @ManyToOne(() => Account, (account) => account.operations, {
    eager: true,
  })
  @JoinColumn()
  account: Account;

  @CreateDateColumn()
  created_at: Date;
}
