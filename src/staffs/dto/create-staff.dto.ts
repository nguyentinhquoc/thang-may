import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator'
export class CreateStaffDto {

  @IsString()
  @IsNotEmpty()
  full_name: string

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  position: string

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  number_phone: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsBoolean()
  @IsNotEmpty()
  status: boolean

  @IsBoolean()
  @IsNotEmpty()
  role: boolean
}
