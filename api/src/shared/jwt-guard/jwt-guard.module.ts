import { Module } from '@nestjs/common';
import { JwtGuardService } from './jwt-guard.service';
import { JwtModule } from '../jwt/jwt.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule,
    PrismaModule,
  ],
  providers: [JwtGuardService],
  exports: [JwtGuardService, JwtModule, PrismaModule]
})
export class JwtGuardModule { }
