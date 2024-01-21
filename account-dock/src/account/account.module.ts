import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([AccountHolder]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
