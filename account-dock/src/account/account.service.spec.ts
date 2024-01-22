import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  describe('createAccount', () => {
    it('should create account', () => {
      const payload = {
        cpf: '08249215427',
        agency: '1234',
      };

      const account = service.create(payload);

      // Assert
      expect(account).toBe(payload);
      expect(service.findAll()).toHaveLength(1);
    });
  });
});
