import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpCustomService } from './shared/http/http.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly httpService: HttpCustomService) {}

  @Get('health2')
  async checkHealth2() {
    const { data } = await this.httpService.request({
      method: 'GET',
      url: `http://micro-core:3000/api/health`,
    });

    return data;
  }

  @Get('health')
  checkHealth(): { status: string } {
    return { status: 'OK' };
  }
}
