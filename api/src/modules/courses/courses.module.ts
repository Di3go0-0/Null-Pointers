import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { CoursesProgramsPrismaService, CoursesRepository } from './repository';

@Module({
  imports: [JwtGuardModule],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    {
      provide: CoursesRepository,
      useClass: CoursesProgramsPrismaService,
    }
  ]
})
export class CoursesModule { }
