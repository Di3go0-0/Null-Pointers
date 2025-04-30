import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { TeachersRepository } from './reporitory/teachers.repository';
import { TeachersPrismaService } from './reporitory/implementation/teachers.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    {
      provide: TeachersRepository,
      useClass: TeachersPrismaService
    }
  ]
})
export class TeachersModule { }
