import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SchedulesCoursesInstancesService } from './schedules-courses-instances.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { GetScheduleDto, PatchScheduleDto, PostScheduleDto } from './dtos';

@ApiTags('Schedules Courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('schedules-courses-instances')
export class SchedulesCoursesInstancesController {
  constructor(private readonly schedulesCoursesInstancesService: SchedulesCoursesInstancesService) { }

  @Get()
  async GetSchedules() {
    return this.schedulesCoursesInstancesService.find()
  }

  @Get()
  async GetSearchSchedules(@Query() querys: GetScheduleDto) {
    return this.schedulesCoursesInstancesService.findSearch(querys)
  }

  @Post()
  async SaveSchedules(@Body() body: PostScheduleDto) {
    return this.schedulesCoursesInstancesService.save(body)
  }

  @Patch(':id')
  async UpdateSchedules(@Param('id', ParseIntPipe) id: number, @Body() body: PatchScheduleDto) {
    return this.schedulesCoursesInstancesService.update(id, body)
  }
}
