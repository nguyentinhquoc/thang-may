import { Test, TestingModule } from '@nestjs/testing';
import { DepartmensService } from './departmens.service';

describe('DepartmensService', () => {
  let service: DepartmensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmensService],
    }).compile();

    service = module.get<DepartmensService>(DepartmensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
