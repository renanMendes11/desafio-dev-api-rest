import { Controller, Get, Post, Body } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { AccountExctractDto } from './dto/account-extract.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('operation')
@ApiTags('Operações (saque, deposito e extrato)')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma operação de saque ou deposito' })
  @ApiResponse({
    status: 201,
    description: 'Criar uma operação de saque ou deposito',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Criar uma operação de saque ou deposito',
    type: CreateOperationDto,
  })
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as operações' })
  @ApiResponse({
    status: 200,
    description: 'Listar todas as operações',
  })
  findAll() {
    return this.operationService.findAll();
  }

  @Get('extract')
  @ApiOperation({ summary: 'Consultar extrato por periodo' })
  @ApiResponse({
    status: 200,
    description: 'Consultar extrato por periodo',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Consultar extrato por periodo',
    type: AccountExctractDto,
  })
  async extractByPeriod(@Body() accountExctractDto: AccountExctractDto) {
    return this.operationService.extractByPeriod(accountExctractDto);
  }
}
