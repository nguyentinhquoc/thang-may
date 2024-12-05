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
import { DepartmensService } from './departmens.service'
import { CreateDepartmenDto } from './dto/create-departmen.dto'
import { UpdateDepartmenDto } from './dto/update-departmen.dto'
import { Response } from 'express'
@Controller('departmens')
export class DepartmensController {
  constructor (private readonly departmensService: DepartmensService) {}

  @Post()
  async create (
    @Body() createDepartmenDto: CreateDepartmenDto,
    @Res() res: Response,
  ) {
    await this.departmensService.create(createDepartmenDto)
    return res.redirect('/departmens')
  }

  @Get()
  @Render('admin/departmens/departmens')
  async findAll () {
    const departmens = await this.departmensService.findAll()
    return {
      departmens,
      activeMenu: 'staff'
    }
  }

  @Patch()
  async update (
    @Body('id') id: string,
    @Body() updateDepartmenDto: UpdateDepartmenDto,
    @Res() res: Response,
  ) {
    await this.departmensService.update(+id, updateDepartmenDto)
    return res.redirect('/departmens')
  }

  @Delete()
  remove (@Body('id') id: string) {
    return this.departmensService.remove(+id)
  }
}
