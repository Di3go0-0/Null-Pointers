import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, ChangePasswordTokenDto, LoginDto, PatchPersonalInfoDto, PostPersonalInfoDto, RegisterDto } from './dto';
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

  @UseGuards(JwtGuardService)
  @Get('personalInfo/:id')
  async getPersonalInfo(@Param('id', ParseIntPipe) userId: number) {
    return this.authService.getPersonalInfo(userId)
  }

  @UseGuards(JwtGuardService)
  @Post('personalInfo/:id')
  async postPersonalInfo(@Param('id', ParseIntPipe) userId: number, @Body() body: PostPersonalInfoDto) {
    return this.authService.postPersonalInfo(userId, body);
  }

  @UseGuards(JwtGuardService)
  @Patch('personalInfo/:id')
  async patchPersonalInfo(@Param('id', ParseIntPipe) userId: number, @Body() body: PatchPersonalInfoDto) {
    return this.authService.patchPersonalInfo(userId, body);
  }

  @UseGuards(JwtGuardService)
  @Patch('chagePasswordWithOld')
  async chagePasswordWithOld(@Body() body: ChangePasswordDto, @Request() req: any) {
    return this.authService.chagePasswordWithOld(req.user.id, body)
  }

  @UseGuards(JwtGuardService)
  @Get('requestPasswordToken')
  async requestPasswordToken(@Request() req: any) {
    return this.authService.requestPasswordToken(req.user.id)
  }

  @UseGuards(JwtGuardService)
  @Patch('changePasswordWithToken')
  async changePasswordWithToken(@Request() req: any, @Body() body: ChangePasswordTokenDto, @Query('token') token: string) {
    return this.authService.changePasswordWithToken(req.user.id, token, body)
  }

}
