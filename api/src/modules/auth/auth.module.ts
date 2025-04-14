import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthPrismaSerivce, AuthRepository } from './repository';

@Module({
  providers: [
    AuthService,
    {
      provide: AuthRepository,
      useClass: AuthPrismaSerivce,
    }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
