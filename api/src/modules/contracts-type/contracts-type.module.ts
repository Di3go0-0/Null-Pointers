import { Module } from '@nestjs/common';
import { ContractsTypeController } from './contracts-type.controller';
import { ContractsTypeService } from './contracts-type.service';
import { ContractsTypeRepository } from './reporitory/contracts-type.repository';
import { ContractsTypePrismaService } from './reporitory/implementation/contracts-type.prisma.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtGuardModule],
  controllers: [ContractsTypeController],
  providers: [
    ContractsTypeService,
    {
      provide: ContractsTypeRepository,
      useClass: ContractsTypePrismaService,

    }
  ]
})
export class ContractsTypeModule { }
