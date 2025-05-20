import { Module } from '@nestjs/common';
import { SchedulesExtensionInstancesController } from './schedules-extension-instances.controller';
import { SchedulesExtensionInstancesService } from './schedules-extension-instances.service';
import { SchedulesExtensionInstancesPrismaService, SchedulesExtensionInstancesRepository } from './repository';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtGuardModule],
  controllers: [SchedulesExtensionInstancesController],
  providers: [
    SchedulesExtensionInstancesService,
    {
      provide: SchedulesExtensionInstancesRepository,
      useClass: SchedulesExtensionInstancesPrismaService,
    }
  ]
})
export class SchedulesExtensionInstancesModule { }
