import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Controller('project')
export class ProjectController {
  constructor (private readonly projectService: ProjectService) {}

  @Post()
  create (@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto)
  }

  @Get('/add')
  @Render('admin/projects/add')
  async renderAdd () {
    return {
    }
  }
  @Get()
  @Render('admin/projects/projects')
  async findAll () {
    const projects = await this.projectService.findAll()
    return {
      projects,
    }
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.projectService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.projectService.remove(+id)
  }
}
