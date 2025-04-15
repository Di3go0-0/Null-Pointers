import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';

@ApiTags('Test')
@Controller('test')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
export class TestController {

  @Get()
  async hi() {
    return 'hi;'
  }
}
