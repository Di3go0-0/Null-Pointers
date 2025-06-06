import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
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
  @Post('login')
  async loginRequest(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @UseGuards(JwtGuardService, RolesGuard)
  @Roles('ADMIN')
  async registerUserDefault(@Body() body: RegisterDto): Promise<number> {
    return this.authService.registerUser(body);
  }

  @Post('userInfo')
  @UseGuards(JwtGuardService)
  async getUserInfo(@Request() req: any): Promise<number> {
    return this.authService.getUserInfo(req.user.id);
  }

  @Get('user-id')
  @UseGuards(JwtGuardService)
  async getUserAuth(@Request() req: any): Promise<number> {
    return req.user.id;
  }


}
