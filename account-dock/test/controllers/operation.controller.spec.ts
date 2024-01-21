import { Test, TestingModule } from '@nestjs/testing';
import { OperationController } from '../../src/operation/operation.controller';
import { OperationService } from '../../src/operation/operation.service';

describe('OperationController', () => {
  let controller: OperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationController],
      providers: [OperationService],
    }).compile();

    controller = module.get<OperationController>(OperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
