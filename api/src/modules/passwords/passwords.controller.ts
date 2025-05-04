import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordsService } from './passwords.service';
import { ChangePasswordTokenDto } from './dtos/change-password-token.dto';
import { ChangePasswordDto } from './dtos';

@ApiTags('Password')
@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) { }

  @Get('requestPasswordToken')
  async requestPasswordToken(@Query('email') email: string) {
    return this.passwordsService.requestPasswordToken(email);
  }

  @Patch('chagePasswordWithOld')
  async chagePasswordWithOld(@Query('email') email: string, @Body() body: ChangePasswordDto) {
    return this.passwordsService.chagePasswordWithOld(email, body);
  }

  @Patch('changePasswordWithToken')
  async changePasswordWithToken(@Query('token') token: string, @Query('email') email: string, @Body() body: ChangePasswordTokenDto) {
    return this.passwordsService.changePasswordWithToken(email, token, body);
  }
}
