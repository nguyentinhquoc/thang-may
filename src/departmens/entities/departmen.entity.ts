import { Staff } from 'src/staffs/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class Department {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255 }) name: string;
  @OneToMany(() => Staff, staff => staff.department)
  staff: Staff[];
}