import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => AccountHolder)
  @JoinColumn()
  accountHolder: AccountHolder;
}
