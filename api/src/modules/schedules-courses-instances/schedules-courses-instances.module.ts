import { Module } from '@nestjs/common';
import { SchedulesCoursesInstancesController } from './schedules-courses-instances.controller';
import { SchedulesCoursesInstancesService } from './schedules-courses-instances.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { SchedulesCoursesInstancesRepository } from './repository';
import { SchedulesCoursesInstancesPrismaService } from './repository/implementation/schedules-courses-instances.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [SchedulesCoursesInstancesController],
  providers: [
    SchedulesCoursesInstancesService,
    {
      provide: SchedulesCoursesInstancesRepository,
      useClass: SchedulesCoursesInstancesPrismaService,
    }
  ]
})
export class SchedulesCoursesInstancesModule { }
