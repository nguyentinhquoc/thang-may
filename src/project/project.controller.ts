import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { WorkflowStepsService } from 'src/workflow_steps/workflow_steps.service'
import { WorkflowsService } from 'src/workflows/workflows.service'
import { CustomersService } from 'src/customers/customers.service'
import { Response } from 'express'
import { StepsService } from 'src/steps/steps.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { ProjectStepsService } from 'src/project_steps/project_steps.service'

@Controller('project')
export class ProjectController {
  constructor (
    private readonly projectService: ProjectService,
    private readonly workflowsService: WorkflowsService,
    private readonly workflowStepsService: WorkflowStepsService,
    private readonly customerService: CustomersService,
    private readonly stepsService: StepsService,
    private readonly staffsService: StaffsService,
    private readonly projectStepsService: ProjectStepsService,
  ) {}

  @Post()
  async create (
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    const Project = await this.projectService.create(createProjectDto)
    await this.customerService.create({
      full_name: createProjectDto.full_name,
      number_phone: createProjectDto.number_phone,
      email: createProjectDto.email,
      address: createProjectDto.address,
    })
    console.log('typeof createProjectDto.steps', typeof createProjectDto.steps)
    const stepsArray = JSON.parse(createProjectDto.steps)
    console.log(typeof stepsArray)
    stepsArray.forEach(async step => {
      console.log(step.date)
      console.log(step.idSteps)
      await this.projectStepsService.create({
        workflowStepsId: step.idSteps,
        projectId: Project.id,
        staffId: step.idStaff,
        time: step.date,
      })
    })
    console.log(createProjectDto.steps)
    return res.redirect('/project')
  }

  @Get('/add')
  @Render('admin/projects/add_project')
  async renderAdd () {
    const workflows = await this.workflowsService.findAll()
    const steps = await this.stepsService.findAll()
    const workflowSteps = await this.workflowStepsService.findAll()
    const staffs = await this.staffsService.findAll()
    return {
      workflows,
      steps,
      workflowSteps,
      staffs,
    }
  }
  @Get()
  @Render('admin/projects/projects')
  async findAll () {
    const projects = await this.projectService.findAll()
    return {
      projects,
      activeMenu: 'project'
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
