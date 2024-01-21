import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountHolderDto } from './dto/create-account-holder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountHolder } from './entities/account-holder.entity';
import { RemoveAccountHolderDto } from './dto/remove-account-holder.dto';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class AccountHolderService {
  constructor(
    @InjectRepository(AccountHolder)
    private accountHolderRepository: Repository<AccountHolder>,
  ) {}

  async create(createAccountHolderDto: CreateAccountHolderDto) {
    if (!cpf.isValid(createAccountHolderDto.cpf)) {
      throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST);
    }
    const findHolder = await this.accountHolderRepository.findOneBy({
      cpf: createAccountHolderDto.cpf,
    });

    if (findHolder) {
      throw new HttpException('CPF já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    await this.accountHolderRepository.save(createAccountHolderDto);
  }

  async findAll() {
    return await this.accountHolderRepository.find();
  }

  async removeHolder(removeAccountHolderDto: RemoveAccountHolderDto) {
    const findHolder = await this.accountHolderRepository.findOneBy({
      cpf: removeAccountHolderDto.cpf,
    });

    if (findHolder === null) {
      throw new HttpException('CPF não cadastrado!', HttpStatus.BAD_REQUEST);
    }

    await this.accountHolderRepository.remove(findHolder);
  }
}
