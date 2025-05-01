import { Module } from '@nestjs/common';
import { JwtGuardService } from './jwt-guard.service';
import { JwtModule } from '../jwt/jwt.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from './jwt-rol-guard.service';

@Module({
  imports: [
    JwtModule,
    PrismaModule,
  ],
  providers: [JwtGuardService, RolesGuard],
  exports: [JwtGuardService, JwtModule, PrismaModule, RolesGuard]
})
export class JwtGuardModule { }
