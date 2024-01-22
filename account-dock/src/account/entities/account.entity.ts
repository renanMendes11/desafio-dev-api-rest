import { AccountHolder } from '../../account-holder/entities/account-holder.entity';
import { Operation } from 'src/operation/entities/operation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;

  @Column()
  number: number;

  @Column()
  agency: string;

  @Column()
  blocked: boolean;

  @OneToOne(() => AccountHolder, {
    eager: true,
  })
  @JoinColumn()
  accountHolder: AccountHolder;

  @OneToMany(() => Operation, (operation) => operation.account)
  operations: Operation[];
}
