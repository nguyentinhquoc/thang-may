import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  SetMetadata,
} from '@nestjs/common'
import { AppService } from './app.service'
import { LoginDto } from './staffs/dto/create-staff.dto copy'
import { StaffsService } from './staffs/staffs.service'
import { Response, Request } from 'express'
import { MailerService } from '@nestjs-modules/mailer'
import { SendMailService } from './send-mail/send-mail.service'
@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private staffsService: StaffsService,
    private mailerService: MailerService,
    private sendMailService: SendMailService,
  ) {}

  @Get('sendmail')
  @SetMetadata('isPublic', true)
  sendMail () {
    const contentSendMail = this.sendMailService.forgotPassword(
      'Nguyễn Tình',
      'nguyentinh201004@gmail.com',
      '123456',
    )
    this.mailerService
      .sendMail(contentSendMail)
      .then(() => {
        console.log('Email sent successfully')
      })
      .catch(error => {
        console.error('Error sending email:', error)
        return { message: 'Gửi mail thất bại!', error: error.message }
      })
    console.log('thanh cong')
    return { message: 'Gửi mail thành công!' }
  }

  @Get()
  @Render('admin/index')
  renderIndexadmin () {
    return {}
  }

  @Get('login')
  @SetMetadata('isPublic', true)
  @Render('login')
  loginRender () {
    return {}
  }
  @Get('logout')
  @SetMetadata('isPublic', true)
  @Render('login')
  logout (@Res() res: Response) {
    res.clearCookie('token')
    return { message: 'Đăng xuất thành công!', status: 'success' }
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  async login (
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const token = await this.staffsService.login(loginDto)
    if (!token) {
      res.render('login', {
        message: 'Email hoặc mật khẩu không hợp lệ!',
        status: 'error',
      })
    } else {
      res.cookie('token', token)
      res.redirect('/')
    }
  }
}
