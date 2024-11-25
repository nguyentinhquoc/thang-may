import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DepartmensModule } from './departmens/departmens.module'
import { StaffsModule } from './staffs/staffs.module'
import { Staff } from './staffs/entities/staff.entity'
import { Department } from './departmens/entities/departmen.entity'
import { PositionsModule } from './positions/positions.module'
import { Position } from './positions/entities/position.entity'
import { CustomersModule } from './customers/customers.module'
import { Customer } from './customers/entities/customer.entity'
import { AuthGuard } from './guards/auth/auth.guard'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import * as cookieParser from 'cookie-parser';
import { JwtModule } from '@nestjs/jwt'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Staff, Department, Position, Customer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    DepartmensModule,
    StaffsModule,
    PositionsModule,
    CustomersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}