import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { JwtGuardService } from './jwt-guard/jwt-guard.service';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtModule, JwtGuardModule],
  providers: [JwtGuardService]
})
export class SharedModule { }
