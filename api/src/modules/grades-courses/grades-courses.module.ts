import { Module } from '@nestjs/common';
import { GradesCoursesController } from './grades-courses.controller';
import { GradesCoursesService } from './grades-courses.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { GradeCourseRepository } from './repository/grades-courses.repository';
import { GradeCourseRepositoryPrismaService } from './repository/implementation/grades-courses.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [GradesCoursesController],
  providers: [
    GradesCoursesService,
    {
      provide: GradeCourseRepository,
      useClass: GradeCourseRepositoryPrismaService,
    }
  ]
})
export class GradesCoursesModule { }
