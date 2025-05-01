import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { Roles } from 'src/shared';

@ApiTags('Auth')
@ApiBearerAuth('Token')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @UseGuards(JwtGuardService, RolesGuard)
  @Roles('ADMIN')
  async registerUserDefault(@Body() body: RegisterDto): Promise<number> {
    return this.authService.registerUser(body);
  }

  @Post('login')
  async loginRequest(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
