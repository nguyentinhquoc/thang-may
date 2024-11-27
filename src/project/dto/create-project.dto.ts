import { IsNotEmpty, IsOptional, IsPhoneNumber, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  number_phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  infor_product?: string;

  @IsNotEmpty()
  @MaxLength(225)
  description: string;

  @IsNotEmpty()
  status: number;
}
