import {
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator'

export class CreateProjectStepDto {
  @IsInt()
  @IsNotEmpty()
  workflowStepsId: number

  @IsInt()
  @IsNotEmpty()
  projectId: number

  @IsInt()
  @IsNotEmpty()
  staffId: number

  @IsNotEmpty()
  time: string
}
