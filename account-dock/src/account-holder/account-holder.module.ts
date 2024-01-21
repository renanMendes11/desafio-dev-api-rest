import { Module } from '@nestjs/common';
import { AccountHolderService } from './account-holder.service';
import { AccountHolderController } from './account-holder.controller';
import { AccountHolder } from './entities/account-holder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccountHolder])],
  controllers: [AccountHolderController],
  providers: [AccountHolderService],
})
export class AccountHolderModule {}
