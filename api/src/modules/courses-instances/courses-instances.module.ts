import { Module } from '@nestjs/common';
import { CoursesInstancesController } from './courses-instances.controller';
import { CoursesInstancesService } from './courses-instances.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { CoursesInstancesRepository } from './repository/courses-instances.repository';
import { CoursesInstancesPrismaService } from './repository/implementation/courses-instances.prisma.service';

@Module({
  imports: [JwtGuardModule],
  controllers: [CoursesInstancesController],
  providers: [
    CoursesInstancesService,
    {
      provide: CoursesInstancesRepository,
      useClass: CoursesInstancesPrismaService,
    }
  ]
})
export class CoursesInstancesModule { }
