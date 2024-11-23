import { Injectable } from '@nestjs/common';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';

@Injectable()
export class DepartmensService {
  create(createDepartmenDto: CreateDepartmenDto) {
    return 'This action adds a new departmen';
  }

  findAll() {
    return `This action returns all departmens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmen`;
  }

  update(id: number, updateDepartmenDto: UpdateDepartmenDto) {
    return `This action updates a #${id} departmen`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmen`;
  }
}
