import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
@Entity()
export class Workflow {
  @PrimaryGeneratedColumn() id: number
  @Column({ length: 225, unique: true })
  name: string
  @Column('text', { nullable: true })
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
