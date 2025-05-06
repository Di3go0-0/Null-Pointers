import { Module } from '@nestjs/common';
import { AcademicProgramsController } from './academic-programs.controller';
import { AcademicProgramsService } from './academic-programs.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { AcademicProgramsPrismaService, AcademicProgramsRepository } from './repository';

@Module({
  imports: [JwtGuardModule],
  controllers: [AcademicProgramsController],
  providers: [
    AcademicProgramsService,
    {
      provide: AcademicProgramsRepository,
      useClass: AcademicProgramsPrismaService,
    }
  ]
})
export class AcademicProgramsModule { }
