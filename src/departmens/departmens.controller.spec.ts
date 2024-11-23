import { Test, TestingModule } from '@nestjs/testing';
import { DepartmensController } from './departmens.controller';
import { DepartmensService } from './departmens.service';

describe('DepartmensController', () => {
  let controller: DepartmensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmensController],
      providers: [DepartmensService],
    }).compile();

    controller = module.get<DepartmensController>(DepartmensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
