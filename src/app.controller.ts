import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // render(){
  //   return 123;
  // }
 @Render('index')
 renderHome(){
//   let a = 1231;
  return{

  }
 }
}
