import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractsTypeModule } from './contracts-type/contracts-type.module';
import { TeachersModule } from './teachers/teachers.module';
import { PersonalInfoModule } from './personal-info/personal-info.module';

@Module({

  imports: [
    AuthModule,
    PersonalInfoModule,
    TeachersModule,
    ContractsTypeModule,
  ]
})
export class ModulesModule { }
