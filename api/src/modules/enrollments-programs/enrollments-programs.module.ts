import { Module } from '@nestjs/common';
import { EnrollmentsProgramsController } from './enrollments-programs.controller';
import { EnrollmentsProgramsService } from './enrollments-programs.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { EnrollmentsProgramsPrismaService, EnrollmentsProgramsRepository } from './repository';

@Module({
  imports: [JwtGuardModule],
  controllers: [EnrollmentsProgramsController],
  providers: [
    EnrollmentsProgramsService,
    {
      provide: EnrollmentsProgramsRepository,
      useClass: EnrollmentsProgramsPrismaService,
    }
  ]
})
export class EnrollmentsProgramsModule { }
