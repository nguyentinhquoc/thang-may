import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { DepartmensModule } from './departmens/departmens.module';
import { StaffsModule } from './staffs/staffs.module';
import { Staff } from './staffs/entities/staff.entity';
import { Department } from './departmens/entities/departmen.entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/entities/position.entity';
@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'quan_ly_thang_may',
      entities: [Staff, Department, Position ],
      synchronize: true,
    }),
    DepartmensModule,
    StaffsModule,
    PositionsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
