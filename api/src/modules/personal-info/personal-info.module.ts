import { Module } from '@nestjs/common';
import { PersonalInfoController } from './personal-info.controller';
import { PersonalInfoService } from './personal-info.service';
import { PersonalInfoPrismaSerivce, PersonalInfoRepository } from './repository';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtGuardModule],
  controllers: [PersonalInfoController],
  providers: [
    PersonalInfoService,
    {
      provide: PersonalInfoRepository,
      useClass: PersonalInfoPrismaSerivce,
    }
  ]
})

export class PersonalInfoModule { }
