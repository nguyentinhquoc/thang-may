import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Render,
  Res,
} from '@nestjs/common'
import { PositionsService } from './positions.service'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { Response } from 'express'

@Controller('positions')
export class PositionsController {
  constructor (private readonly positionsService: PositionsService) {}

  @Post()
  async create (
    @Body() createPositionDto: CreatePositionDto,
    @Res() res: Response,
  ) {
    await this.positionsService.create(createPositionDto)
    return res.redirect('/positions')
  }

  @Get()
  @Render('admin/positions/positions')
  async findAll () {
    const positions = await this.positionsService.findAll()
    return {
      positions,
      activeMenu: 'staff'
}
  }

  @Patch()
  async update (
    @Body('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
    @Res() res: Response,
  ) {
    await this.positionsService.update(+id, updatePositionDto)
    return res.redirect('/positions')
  }

  @Delete()
  remove (@Body('id') id: string) {
    return this.positionsService.remove(+id)
  }
}
