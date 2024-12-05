import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Render,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { StaffsService } from './staffs.service'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { LoginDto } from './dto/create-staff-logindto'
import { PositionsService } from 'src/positions/positions.service'
import { DepartmensService } from 'src/departmens/departmens.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { log } from 'handlebars/runtime'

@Controller('staffs')
export class StaffsController {
  constructor (
    private readonly staffsService: StaffsService,
    private readonly positionsService: PositionsService,
    private readonly departmensService: DepartmensService,
  ) {}
  @Post()
  create (@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto)
  }
  @Get('/add')
  @Render('admin/staff/add')
  async renderAdd () {
    const positions = await this.positionsService.findAll()
    const departmens = await this.departmensService.findAll()
    return {
      positions,
      departmens,
      activeMenu: 'staff',
    }
  }
  @Post('/add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/avatar',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
  )
  async postAdd(@UploadedFile() file: Express.Multer.File, @Body() createStaffDto: CreateStaffDto, @Res() res: Response) {
    createStaffDto.avatar = file.filename
    await this.staffsService.create(createStaffDto)
    return res.redirect('/staffs')
  }

  @Get()
  @Render('admin/staff/staff')
  async findAll () {
    const staffs = await this.staffsService.findAll()
    return {
      staffs,
      activeMenu: 'staff',
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
  @Delete()
  remove (@Body('id') id: string) {
    return this.staffsService.remove(+id)
  }
}
