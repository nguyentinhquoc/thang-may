import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Patch()
  update(@Body('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(+id,updatePositionDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.positionsService.remove(+id);
  }
}
