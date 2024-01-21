import { Test, TestingModule } from '@nestjs/testing';
import { AccountHolderController } from '../../src/account-holder/account-holder.controller';
import { AccountHolderService } from '../../src/account-holder/account-holder.service';

describe('AccountHolderController', () => {
  let controller: AccountHolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountHolderController],
      providers: [AccountHolderService],
    }).compile();

    controller = module.get<AccountHolderController>(AccountHolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
