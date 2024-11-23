import { Module } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { DepartmensController } from './departmens.controller';

@Module({
  controllers: [DepartmensController],
  providers: [DepartmensService],
})
export class DepartmensModule {}
