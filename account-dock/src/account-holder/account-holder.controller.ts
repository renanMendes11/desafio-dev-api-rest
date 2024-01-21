import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AccountHolderService } from './account-holder.service';
import { CreateAccountHolderDto } from './dto/create-account-holder.dto';
import { RemoveAccountHolderDto } from './dto/remove-account-holder.dto';

@Controller('account-holder')
export class AccountHolderController {
  constructor(private readonly accountHolderService: AccountHolderService) {}

  @Post()
  create(@Body() createAccountHolderDto: CreateAccountHolderDto) {
    return this.accountHolderService.create(createAccountHolderDto);
  }

  @Get()
  findAll() {
    return this.accountHolderService.findAll();
  }

  @Delete()
  removeHolder(@Body() removeAccountHolderDto: RemoveAccountHolderDto) {
    return this.accountHolderService.removeHolder(removeAccountHolderDto);
  }
}
