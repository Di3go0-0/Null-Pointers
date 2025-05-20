import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractsTypeModule } from './contracts-type/contracts-type.module';
import { TeachersModule } from './teachers/teachers.module';
import { PersonalInfoModule } from './personal-info/personal-info.module';
import { PasswordsModule } from './passwords/passwords.module';
import { StudentsModule } from './students/students.module';
import { ParentsInfoModule } from './parents-info/parents-info.module';
import { AcademicProgramsModule } from './academic-programs/academic-programs.module';
import { CoursesModule } from './courses/courses.module';
import { ExtensionCoursesModule } from './extension-courses/extension-courses.module';
import { CoursesInstancesModule } from './courses-instances/courses-instances.module';
import { SchedulesCoursesInstancesModule } from './schedules-courses-instances/schedules-courses-instances.module';
import { EnrollmentsCoursesModule } from './enrollments-courses/enrollments-courses.module';
import { EnrollmentsProgramsModule } from './enrollments-programs/enrollments-programs.module';
import { ExtensionInstancesModule } from './extension-courses-instances/extension-instance.module';
import { SchedulesExtensionInstancesModule } from './schedules-extension-instances/schedules-extension-instances.module';

@Module({

  imports: [
    AuthModule,
    PersonalInfoModule,
    PasswordsModule,
    TeachersModule,
    StudentsModule,
    ContractsTypeModule,
    ParentsInfoModule,
    AcademicProgramsModule,
    CoursesModule,
    CoursesInstancesModule,
    ExtensionCoursesModule,
    SchedulesCoursesInstancesModule,
    EnrollmentsCoursesModule,
    EnrollmentsProgramsModule,
    ExtensionInstancesModule,
    SchedulesExtensionInstancesModule,
  ]
})
export class ModulesModule { }
