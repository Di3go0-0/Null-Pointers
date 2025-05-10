import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UseGuards } from '@nestjs/common';
import { CoursesInstancesService } from './courses-instances.service';
import { GetByStatusCoursesInstancesDto, PatchCourseInstanceDto, PostCourseInstanceDto } from './dtos';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';

@ApiTags('Courses Instances')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('courses-instances')
export class CoursesInstancesController {
  constructor(private readonly coursesInstancesService: CoursesInstancesService) { }

  @Get()
  findCoursesInstances() {
    return this.coursesInstancesService.findCoursesInstances();
  }

  @Get('status')
  findCoursesByStatus(@Query() status: GetByStatusCoursesInstancesDto) {
    return this.coursesInstancesService.findCoursesByStatus(status);
  }

  @Get('teacher')
  findCoursesByTeacher(@Query('teacherId') teacherId: number) {
    return this.coursesInstancesService.findCoursesByTeacher(teacherId);
  }

  @Get('course')
  findCoursesByCourseId(@Query('courseId') courseId: number) {
    return this.coursesInstancesService.findCoursesByCourseId(courseId);
  }

  @Get(':id')
  findCoursesById(@Param('id') id: number) {
    return this.coursesInstancesService.findCoursesById(id);
  }

  @Post()
  saveCourseInstance(@Body() body: PostCourseInstanceDto) {
    return this.coursesInstancesService.saveCourseInstance(body);
  }

  @Patch(':id')
  updateCourseInstance(@Param('id') id: number, @Body() body: PatchCourseInstanceDto) {
    return this.coursesInstancesService.updateCourseInstance(id, body);
  }

  @Delete(':id')
  deleteCourseInstance(@Param('id') id: number) {
    return this.coursesInstancesService.deleteCourseInstance(id);
  }
}

