import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Response } from 'express'
@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}
  @Post()
  async create(@Body() createStepDto: CreateStepDto, @Res() res: Response,) {
    await this.stepsService.create(createStepDto);
    return res.redirect('back');
  }
  @Get()
  findAll() {
    return this.stepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id);
  }
}
