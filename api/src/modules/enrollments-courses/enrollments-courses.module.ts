import { Module } from '@nestjs/common';
import { EnrollmentsCoursesController } from './enrollments-courses.controller';
import { EnrollmentsCoursesService } from './enrollments-courses.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { EnrollmentsCoursesPrismaService, EnrollmentsCoursesRepository } from './repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [EnrollmentsCoursesController],
  providers: [
    EnrollmentsCoursesService,
    PrismaService,
    {
      provide: EnrollmentsCoursesRepository,
      useClass: EnrollmentsCoursesPrismaService,
    }
  ]
})
export class EnrollmentsCoursesModule { }
