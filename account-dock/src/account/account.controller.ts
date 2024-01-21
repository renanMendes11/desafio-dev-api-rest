import { Controller, Get, Post, Body, Delete, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RemoveAccountDto } from './dto/remove-account.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Delete()
  removeAccount(@Body() removeAccountDto: RemoveAccountDto) {
    return this.accountService.removeAccount(removeAccountDto);
  }

  @Patch()
  updateAccountStatus(@Body() updateAccountStatusDto: UpdateAccountStatusDto) {
    return this.accountService.updateAccountStatus(updateAccountStatusDto);
  }
}
