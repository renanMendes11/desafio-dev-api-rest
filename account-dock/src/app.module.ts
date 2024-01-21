import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountHolderModule } from './account-holder/account-holder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AccountModule } from './account/account.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [AccountHolderModule, TypeOrmModule.forRoot(config), AccountModule, OperationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}