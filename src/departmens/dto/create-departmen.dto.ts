import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmenDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
