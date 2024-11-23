import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';

@Controller('departmens')
export class DepartmensController {
  constructor(private readonly departmensService: DepartmensService) {}

  @Post()
  create(@Body() createDepartmenDto: CreateDepartmenDto) {
    return this.departmensService.create(createDepartmenDto);
  }

  @Get()
  findAll() {
    return this.departmensService.findAll();
  }

  @Patch()
  update(@Body('id') id: string, @Body() updateDepartmenDto: UpdateDepartmenDto) {
    return this.departmensService.update(+id, updateDepartmenDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.departmensService.remove(+id);
  }
}
