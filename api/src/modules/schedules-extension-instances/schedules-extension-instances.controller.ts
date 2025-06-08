import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SchedulesExtensionInstancesService } from './schedules-extension-instances.service';
import { GetScheduleDto, PostScheduleDto, PatchScheduleDto } from './dtos';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';

@ApiTags('Schedules Extension Courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('schedules-extension-instances')
export class SchedulesExtensionInstancesController {
  constructor(private readonly schedulesExtensionInstancesService: SchedulesExtensionInstancesService) { }

  @Get()
  async GetSchedules() {
    return this.schedulesExtensionInstancesService.find()
  }

  @Get('search')
  async GetSearchSchedules(@Query() querys: GetScheduleDto) {
    return this.schedulesExtensionInstancesService.findSearch(querys)
  }

  @Post()
  async SaveSchedules(@Body() body: PostScheduleDto) {
    return this.schedulesExtensionInstancesService.save(body)
  }

  @Patch(':id')
  async UpdateSchedules(@Param('id', ParseIntPipe) id: number, @Body() body: PatchScheduleDto) {
    return this.schedulesExtensionInstancesService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Body() body: PatchScheduleDto) {
    return this.schedulesExtensionInstancesService.delete(id);
  }

}
