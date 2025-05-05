import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { StudentsRepository } from './repository/students.repository';
import { StudentsPrismaService } from './repository/implementation/students.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    {
      provide: StudentsRepository,
      useClass: StudentsPrismaService,
    }
  ]
})
export class StudentsModule { }
