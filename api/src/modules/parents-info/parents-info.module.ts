import { Module } from '@nestjs/common';
import { ParentsInfoController } from './parents-info.controller';
import { ParentsInfoService } from './parents-info.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { ParentsInfoPrismaService, ParentsInfoRepository } from './repository';

@Module({
  imports: [JwtGuardModule],
  controllers: [ParentsInfoController],
  providers: [
    ParentsInfoService,
    {
      provide: ParentsInfoRepository,
      useClass: ParentsInfoPrismaService,
    }
  ]
})
export class ParentsInfoModule { }
