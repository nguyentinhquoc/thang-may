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
import * as cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { SendMailService } from './send-mail/send-mail.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { Workflow } from './workflows/entities/workflow.entity'
console.log(join(__dirname ,'../views/SendMail'))

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
        entities: [Staff, Department, Position, Customer, Workflow],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASS'),
            }
          },
        };
      },
      inject: [ConfigService],
    }),
    DepartmensModule,
    StaffsModule,
    PositionsModule,
    CustomersModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
      // provide: APP_GUARD,
      // useClass: AuthGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    SendMailService,
  ],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
  }
}
