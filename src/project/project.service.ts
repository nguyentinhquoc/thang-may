import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProjectService {
  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create (createProjectDto: CreateProjectDto) {
    return this.projectRepository.save({
      full_name : createProjectDto.full_name,
      number_phone: createProjectDto.number_phone,
      email: createProjectDto.email,
      address: createProjectDto.address,
    })
  }

  findAll () {
    return this.projectRepository.find()
  }

  findOne (id: number) {
    return `This action returns a #${id} project`
  }

  update (id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`
  }

  remove (id: number) {
    return `This action removes a #${id} project`
  }
}
