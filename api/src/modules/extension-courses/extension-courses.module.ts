import { Module } from '@nestjs/common';
import { ExtensionCoursesController } from './extension-courses.controller';
import { ExtensionCoursesService } from './extension-courses.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { ExtensionCoursesProgramsPrismaService, ExtensionCoursesRepository } from './repository';

@Module({
  imports: [JwtGuardModule],
  controllers: [ExtensionCoursesController],
  providers: [
    ExtensionCoursesService,
    {
      provide: ExtensionCoursesRepository,
      useClass: ExtensionCoursesProgramsPrismaService,
    }
  ]
})
export class ExtensionCoursesModule { }
