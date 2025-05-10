import { Module } from '@nestjs/common';
import { CoursesInstancesController } from './courses-instances.controller';
import { CoursesInstancesService } from './courses-instances.service';

@Module({
  controllers: [CoursesInstancesController],
  providers: [CoursesInstancesService]
})
export class CoursesInstancesModule {}
