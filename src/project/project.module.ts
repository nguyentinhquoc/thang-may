import { Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { Project } from './entities/project.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'
import { WorkflowsModule } from 'src/workflows/workflows.module'
import { CustomersModule } from 'src/customers/customers.module'
import { Step } from 'src/steps/entities/step.entity'
import { StepsModule } from 'src/steps/steps.module'
import { StaffsModule } from 'src/staffs/staffs.module'

@Module({
  imports: [TypeOrmModule.forFeature([Project]),WorkflowsModule,CustomersModule,StepsModule,WorkflowStepsModule,StaffsModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
