import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractsTypeModule } from './contracts-type/contracts-type.module';
import { TeachersModule } from './teachers/teachers.module';
import { PersonalInfoModule } from './personal-info/personal-info.module';
import { PasswordsModule } from './passwords/passwords.module';
import { StudentsModule } from './students/students.module';
import { ParentsInfoModule } from './parents-info/parents-info.module';

@Module({

  imports: [
    AuthModule,
    PersonalInfoModule,
    PasswordsModule,
    TeachersModule,
    StudentsModule,
    ContractsTypeModule,
    ParentsInfoModule,
  ]
})
export class ModulesModule { }
