import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractsTypeModule } from './contracts-type/contracts-type.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({

  imports: [AuthModule, ContractsTypeModule, TeachersModule]
})
export class ModulesModule { }
