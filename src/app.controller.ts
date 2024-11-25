import { Body, Controller, Get, Post, Render, Req, Res, SetMetadata } from '@nestjs/common'
import { AppService } from './app.service'
import { LoginDto } from './staffs/dto/create-staff.dto copy'
import { StaffsService } from './staffs/staffs.service'
import { Response, Request } from 'express'
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private staffsService: StaffsService,
  ) { }

  @Get()
  @Render('admin/index')
  renderIndexadmin() {
    return {}
  }

  @Get('login')
  @SetMetadata('isPublic', true)
  @Render('login')
  loginRennder() {
    return {}
  }
  @Get('logout')
  @SetMetadata('isPublic', true)
  @Render('login')
  logout(@Res() res: Response) {
    res.clearCookie('token')
    return { message: 'Đăng xuất thành công!', status: 'success' }
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  async login(@Body() loginDto: LoginDto, @Res() res: Response, @Req() req: Request) {
    const token = await this.staffsService.login(loginDto)
    if (!token) {
      res.render('login', {
        message: 'Email hoặc mật khẩu không hợp lệ!',
        status: 'error',
      })
    }
    else {
      res.cookie('token', token, { maxAge: 5000000000000000 });
      res.redirect('/')
      res.render('index', {
        message: 'Đăng nhập thành công!',
        status: 'success',
      })
    }
  }
}
