import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from '../services/administrator/administrator.service';

@Controller()
export class AppController {
  constructor(
    private administratorService: AdministratorService
  ) { }


  @Get()
  getIndex(): string {
    return 'Home page';
  }


}
