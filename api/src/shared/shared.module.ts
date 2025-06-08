import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { JwtGuardService } from './jwt-guard/jwt-guard.service';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    JwtModule,
    JwtGuardModule,
    PrismaModule,
    EmailModule
  ],
  providers: [JwtGuardService]
})
export class SharedModule { }
