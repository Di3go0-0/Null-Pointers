import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractsTypeModule } from './contracts-type/contracts-type.module';

@Module({

  imports: [AuthModule, ContractsTypeModule]
})
export class ModulesModule { }
