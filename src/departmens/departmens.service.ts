import { Injectable } from '@nestjs/common';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/departmen.entity';
import { Repository } from 'typeorm';
@Injectable()
export class DepartmensService {
  constructor(
    @InjectRepository(Department)
    private positionsRepository: Repository<Department>
  ) { }
  create(createDepartmenDto: CreateDepartmenDto) {
    return this.positionsRepository.save(createDepartmenDto)
  }
  findAll() {
    return this.positionsRepository.find()
  }
  update(id: number, updateDepartmenDto: UpdateDepartmenDto) {
    return this.positionsRepository.update(id, updateDepartmenDto);
  }
  remove(id: number) {
    return this.positionsRepository.softDelete(id);
  }
}
