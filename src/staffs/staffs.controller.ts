import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Render
} from '@nestjs/common'
import { StaffsService } from './staffs.service'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { LoginDto } from './dto/create-staff.dto copy'

@Controller('staffs')
export class StaffsController {
  constructor (private readonly staffsService: StaffsService) {}

  @Post()
  create (@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto)
  }

  @Get()
    @Render('admin/staff/staff')

  async findAll () {
    const staffs = await this.staffsService.findAll()
    return {
      staffs,
      activeMenu: 'staff'
    }
  }


  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.staffsService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.staffsService.remove(+id)
  }
}
