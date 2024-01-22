import { Controller, Get, Post, Body, Delete, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RemoveAccountDto } from './dto/remove-account.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('account')
@ApiTags('Conta digital')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma conta digital' })
  @ApiResponse({
    status: 201,
    description: 'Criar uma conta digital',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Criar uma conta digital',
    type: CreateAccountDto,
  })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as contas' })
  @ApiResponse({
    status: 200,
    description: 'Listar todas as contas',
  })
  findAll() {
    return this.accountService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Remover uma conta digital' })
  @ApiResponse({
    status: 200,
    description: 'Remover uma conta digital',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Remover uma conta digital',
    type: RemoveAccountDto,
  })
  removeAccount(@Body() removeAccountDto: RemoveAccountDto) {
    return this.accountService.removeAccount(removeAccountDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar status da conta' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar status da conta',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Atualizar status da conta',
    type: UpdateAccountStatusDto,
  })
  updateAccountStatus(@Body() updateAccountStatusDto: UpdateAccountStatusDto) {
    return this.accountService.updateAccountStatus(updateAccountStatusDto);
  }
}
