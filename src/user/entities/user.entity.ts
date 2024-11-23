import { IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNumber()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
