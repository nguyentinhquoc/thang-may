import { Staff } from "src/staffs/entities/staff.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Position {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255 })
  name: string;
  @OneToMany(() => Staff, staff => staff.position)
  staff: Staff[];
}


