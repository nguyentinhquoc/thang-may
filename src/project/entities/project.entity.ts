import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 255 })
  full_name: string
  @Column({ length: 15 })
  number_phone: string
  @Column({ nullable: true, length: 255 })
  email: string
  @Column(`text`, { nullable: true })
  address: string
  @Column('json', { nullable: true })
  infor_product: string
  @Column({ length: 225, nullable: true })
  description: string
  @Column({ default: 0 })
  status: number
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
