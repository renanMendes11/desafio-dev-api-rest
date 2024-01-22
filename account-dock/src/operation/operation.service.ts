import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';
import { Operation } from './entities/operation.entity';
import { OperationType } from './OperationTypeEnum';
import { AccountExctractDto } from 'src/operation/dto/account-extract.dto';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(AccountHolder)
    private accountHolderRepository: Repository<AccountHolder>,
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  async create(createOperationDto: CreateOperationDto) {
    const findHolder = await this.accountHolderRepository.findOneBy({
      cpf: createOperationDto.cpf,
    });
    // validando se o usuario existe
    if (findHolder === null) {
      throw new HttpException(
        'CPF inválido! Não existe no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const holderHaveAccount = await this.accountRepository.findOneBy({
      accountHolder: {
        cpf: createOperationDto.cpf,
      },
    });
    // validando se o usuario tem conta
    if (holderHaveAccount === null) {
      throw new HttpException(
        'Usuário não tem uma conta associada ao seu cpf!',
        HttpStatus.BAD_REQUEST,
      );
    }
    // validando status da conta
    if (holderHaveAccount.blocked) {
      throw new HttpException(
        'Conta bloqueda. Impossivel realizar uma operação',
        HttpStatus.BAD_REQUEST,
      );
    }

    // validando se o tipo da operação enviado existe (SAQUE, DEPOSITO)
    if (
      !Object.values(OperationType).includes(
        createOperationDto.type as unknown as OperationType,
      )
    ) {
      throw new HttpException(
        'Tipo da operação inválida!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const type = Object.values(OperationType).find(
      (op) => op === createOperationDto.type,
    );

    //validando o limite de saque e se o valor do saque é maior que o saldo da conta
    if (type === 'SAQUE') {
      const startToday = new Date(new Date().setHours(0, 0, 0, 0));
      const endToday = new Date(
        new Date(startToday).setDate(startToday.getDate() + 1),
      );
      // soma os valares dos saques anteriores do dia atual
      const sumOperationsToday = await this.operationRepository.sum('value', {
        account: {
          accountHolder: {
            cpf: createOperationDto.cpf,
          },
        },
        created_at: Between(startToday, endToday),
        type: OperationType.PULL,
      });
      // soma do saques anteriores + novo saque
      const sumOperationsTodayMoreNewOperation =
        createOperationDto.value + sumOperationsToday;
      if (sumOperationsTodayMoreNewOperation > 2000) {
        throw new HttpException(
          'Limite de saque excedido!',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (createOperationDto.value > holderHaveAccount.balance)
        throw new HttpException(
          'Valor do saque maior que o saldo disponível em conta!',
          HttpStatus.BAD_REQUEST,
        );
    }

    const operationData = {
      type,
      value: createOperationDto.value,
      account: holderHaveAccount,
    };
    await this.operationRepository.save(operationData);

    // atualizando saldo da conta
    let newBalance = 0;
    if (type === 'SAQUE')
      newBalance = holderHaveAccount.balance - createOperationDto.value;

    if (type === 'DEPOSITO')
      newBalance = holderHaveAccount.balance + createOperationDto.value;

    await this.accountRepository.update(holderHaveAccount.id, {
      balance: newBalance,
    });
  }

  async findAll() {
    return await this.operationRepository.find();
  }

  async extractByPeriod(accountExctractDto: AccountExctractDto) {
    const findAccount = await this.accountRepository.findOneBy({
      accountHolder: {
        cpf: accountExctractDto.cpf,
      },
    });

    if (findAccount === null) {
      throw new HttpException(
        'Não existe conta associada a esse cpf!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const start = new Date(
      new Date(accountExctractDto.startDate).setHours(0, 0, 0, 0),
    );
    const end = new Date(
      new Date(accountExctractDto.endDate).setHours(23, 59, 59, 59),
    );

    console.log(start);
    console.log(end);

    const extract = await this.operationRepository.findBy({
      account: {
        accountHolder: {
          cpf: accountExctractDto.cpf,
        },
      },
      created_at: Between(start, end),
    });

    return extract.map(function (op) {
      return {
        operationId: op.id,
        operationType: op.type,
        operationValue: op.value,
        cpfAccountHolder: op.account.accountHolder.cpf,
        operationDate: op.created_at,
      };
    });
  }
}
