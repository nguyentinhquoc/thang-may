import { Injectable } from '@nestjs/common';
import { StaffsService } from 'src/staffs/staffs.service';

@Injectable()
export class AuthService {
  constructor(private staffsService: StaffsService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.staffsService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
