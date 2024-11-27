import { Step } from 'src/steps/entities/step.entity'
import { Workflow } from 'src/workflows/entities/workflow.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity('workflow_steps')
export class WorkflowStep {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Step, step => step.workflowSteps)
  @JoinColumn({ name: 'stepId' })
  step: Step
  @ManyToOne(() => Workflow, workflow => workflow.workflowSteps)
  @JoinColumn({ name: 'workflowId' })
  workflow: Workflow
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
