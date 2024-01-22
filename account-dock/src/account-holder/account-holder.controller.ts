import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AccountHolderService } from './account-holder.service';
import { CreateAccountHolderDto } from './dto/create-account-holder.dto';
import { RemoveAccountHolderDto } from './dto/remove-account-holder.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountHolder } from './entities/account-holder.entity';

@ApiTags('Titular da conta')
@Controller('account-holder')
export class AccountHolderController {
  constructor(private readonly accountHolderService: AccountHolderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um titular' })
  @ApiResponse({
    status: 201,
    description: 'criar um titular',
    type: AccountHolder,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Criar um titular',
    type: CreateAccountHolderDto,
  })
  create(@Body() createAccountHolderDto: CreateAccountHolderDto) {
    return this.accountHolderService.create(createAccountHolderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os titulares' })
  @ApiResponse({
    status: 200,
    description: 'Listar todos os titulares',
    type: AccountHolder,
  })
  findAll() {
    return this.accountHolderService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Excluir um titular' })
  @ApiResponse({
    status: 200,
    description: 'Excluir um titular',
    type: AccountHolder,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Criar um titular',
    type: RemoveAccountHolderDto,
  })
  removeHolder(@Body() removeAccountHolderDto: RemoveAccountHolderDto) {
    return this.accountHolderService.removeHolder(removeAccountHolderDto);
  }
}
