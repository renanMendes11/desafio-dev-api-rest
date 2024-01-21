import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { AccountHolder } from 'src/account-holder/entities/account-holder.entity';
import Utils from 'src/Utils';

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
    };

    await this.accountRepository.save(accountData);
  }

  async findAll() {
    return await this.accountRepository.find();
  }
}
