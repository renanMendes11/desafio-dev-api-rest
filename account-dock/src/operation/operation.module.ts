import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';
import { Operation } from './entities/operation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([AccountHolder]),
    TypeOrmModule.forFeature([Operation]),
  ],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
