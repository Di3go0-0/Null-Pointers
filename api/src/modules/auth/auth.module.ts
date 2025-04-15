import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthPrismaSerivce, AuthRepository } from './repository';
import { JwtModule } from '../../shared/jwt/jwt.module';

@Module({
  imports: [JwtModule],
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
