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
import { WorkflowsService } from './workflows.service'
import { CreateWorkflowDto } from './dto/create-workflow.dto'
import { UpdateWorkflowDto } from './dto/update-workflow.dto'
import { Response } from 'express'

@Controller('workflows')
export class WorkflowsController {
  constructor (private readonly workflowsService: WorkflowsService) {}

  @Post()
  async create (
    @Body() createWorkflowDto: CreateWorkflowDto,
    @Res() res: Response,
  ) {
    const workflows = await this.workflowsService.create(createWorkflowDto)
    return res.redirect(`/workflows/${workflows}`)
  }

  @Get()
  @Render('admin/workflows/workflows')
  async findAll () {
    const workflows = await this.workflowsService.findAll()
    return {
      workflows,
    }
  }

  @Get(':id')
  @Render('admin/workflows/edit_workflows')
  findOne (@Param('id') id: string) {
    return {}
    // this.workflowsService.findOne(+id)
  }

  @Patch()
  async update (
    @Body('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
    @Res() res: Response,
  ) {
    await this.workflowsService.update(+id, updateWorkflowDto)

    return res.redirect('/workflows')
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.workflowsService.remove(+id)
  }
}
