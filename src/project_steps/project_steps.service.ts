import { Injectable } from '@nestjs/common';
import { CreateProjectStepDto } from './dto/create-project_step.dto';
import { UpdateProjectStepDto } from './dto/update-project_step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectStep } from './entities/project_step.entity';

@Injectable()
export class ProjectStepsService {
  constructor(
    @InjectRepository(ProjectStep)
    private projectStepRepository: Repository<ProjectStep>,
  ) { }
  create(createProjectStepDto: CreateProjectStepDto) {
    return this.projectStepRepository.save(createProjectStepDto);
  }

  findAll() {
    return `This action returns all projectSteps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectStep`;
  }

  update(id: number, updateProjectStepDto: UpdateProjectStepDto) {
    return `This action updates a #${id} projectStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectStep`;
  }
}
