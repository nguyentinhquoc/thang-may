import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { Staff } from './entities/staff.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt' // Import thư viện bcrypt
import { LoginDto } from './dto/create-staff.dto copy'

@Injectable()
export class StaffsService {
  constructor (
    @InjectRepository(Staff)
    private staffsRepository: Repository<Staff>
  ) {}

  async create (createStaffDto: CreateStaffDto): Promise<Staff> {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(
      createStaffDto.password,
      saltRounds
    )
    const createStaffDtohash = this.staffsRepository.create({
      ...createStaffDto,
      password: hashedPassword
    })
    return this.staffsRepository.save(createStaffDtohash)
  }

  findAll () {
    return this.staffsRepository.find()
  }

  findOne (id: number) {
    return this.staffsRepository.findOne({ where: { id } })
  }

  async login (loginDto: LoginDto) {
    const { email, password } = loginDto
    const staff = await this.staffsRepository.findOne({ where: { email: loginDto.email } });
    if (!staff) {
      return "Tài khoản hoặc mật khẩu không chính xác"

    }
    const isPasswordValid = await bcrypt.compare(password, staff.password)
    if (!isPasswordValid) {
    return "Tài khoản hoặc mật khẩu không chính xác"
    }
    return staff
  }

  async update (id: number, updateStaffDto: UpdateStaffDto) {
    if (updateStaffDto.password) {
      const saltRounds = 10
      updateStaffDto.password = await bcrypt.hash(
        updateStaffDto.password,
        saltRounds
      )
    }
    await this.staffsRepository.update(id, updateStaffDto)
  }

  remove (id: number) {
    return `This action removes a #${id} staff`
  }
}
