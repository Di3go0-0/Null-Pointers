import { Module } from '@nestjs/common';
import { GradesExtensionCoursesController } from './grades-extension-courses.controller';
import { GradesCoursesService } from './grades-extension-courses.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { GradeCourseRepository } from './repository/grades-courses.repository';
import { GradeCourseRepositoryPrismaService } from './repository/implementation/grades-courses.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [GradesExtensionCoursesController],
  providers: [
    GradesCoursesService,
    {
      provide: GradeCourseRepository,
      useClass: GradeCourseRepositoryPrismaService,
    }
  ]
})
export class GradesExtensionCoursesModule { }
