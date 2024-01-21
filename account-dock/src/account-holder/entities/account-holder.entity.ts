import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AccountHolder {
  @PrimaryColumn({
    length: 11,
  })
  cpf: string;

  @Column()
  name: string;
}
