import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import Utils from 'src/Utils';
import { RemoveAccountDto } from './dto/remove-account.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';
import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(AccountHolder)
    private accountHolderRepository: Repository<AccountHolder>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const findHolder = await this.accountHolderRepository.findOneBy({
      cpf: createAccountDto.cpf,
    });

    if (findHolder === null) {
      throw new HttpException(
        'CPF inválido! Não existe no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const holderHaveAccount = await this.accountRepository.findOneBy({
      accountHolder: {
        cpf: createAccountDto.cpf,
      },
    });

    if (holderHaveAccount) {
      throw new HttpException(
        'Usuário já possui uma conta associada ao seu cpf!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const accountData = {
      accountHolder: findHolder,
      number: Utils.getRandomInt(111, 999),
      agency: createAccountDto.agency,
      balance: 0,
      blocked: false,
    };

    await this.accountRepository.save(accountData);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async removeAccount(removeAccountDto: RemoveAccountDto) {
    const findAccount = await this.accountRepository.findOneBy({
      accountHolder: {
        cpf: removeAccountDto.cpf,
      },
    });

    if (findAccount === null) {
      throw new HttpException(
        'Não existe conta associada a esse cpf!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.accountRepository.remove(findAccount);
  }

  async updateAccountStatus(updateAccountStatusDto: UpdateAccountStatusDto) {
    const findAccount = await this.accountRepository.findOneBy({
      accountHolder: {
        cpf: updateAccountStatusDto.cpf,
      },
    });

    if (findAccount === null) {
      throw new HttpException(
        'Não existe conta associada a esse cpf!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.accountRepository.update(
      {
        accountHolder: {
          cpf: updateAccountStatusDto.cpf,
        },
      },
      {
        blocked: updateAccountStatusDto.blocked,
      },
    );
  }
}
