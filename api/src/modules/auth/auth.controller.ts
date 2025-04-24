import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('registerStudent')
  async registerRequest(@Body() body: RegisterDto): Promise<boolean> {
    return this.authService.registerStudentRequest(body);
  }

  @Post('login')
  async loginRequest(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
