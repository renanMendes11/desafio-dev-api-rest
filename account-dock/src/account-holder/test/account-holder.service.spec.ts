import { Test, TestingModule } from '@nestjs/testing';
import { AccountHolderService } from '../account-holder.service';

describe('AccountHolderService', () => {
  let service: AccountHolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountHolderService],
    }).compile();

    service = module.get<AccountHolderService>(AccountHolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
