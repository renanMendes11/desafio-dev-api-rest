import { Module } from '@nestjs/common';
import { AccountHolderModule } from './account-holder/account-holder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AccountModule } from './account/account.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [
    AccountHolderModule,
    TypeOrmModule.forRoot(config),
    AccountModule,
    OperationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
