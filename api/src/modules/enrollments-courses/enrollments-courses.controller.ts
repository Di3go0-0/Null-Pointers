import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { EnrollmentsCoursesService } from './enrollments-courses.service';
import { GetEnrollmentsCoursesDto, PatchEnrollmentsCoursesDto, PostEnrollmentsCoursesDto } from './dtos';

@ApiTags('Enrollments courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('enrollments-courses')
export class EnrollmentsCoursesController {
  constructor(private readonly enrollmentsCoursesService: EnrollmentsCoursesService) { }

  @Get()
  async GetEnrollmentsCourses() {
    return this.enrollmentsCoursesService.find()
  }

  @Get('search')
  async searchEnrollments(@Query() query: GetEnrollmentsCoursesDto) {
    return this.enrollmentsCoursesService.findSearch(query);
  }

  @Post()
  async SaveEnrollmentsCourses(@Body() body: PostEnrollmentsCoursesDto) {
    return this.enrollmentsCoursesService.save(body)
  }

  @Patch(':id')
  async PatchEnrollmentsCourses(@Param('id', ParseIntPipe) id: number, @Body() body: PatchEnrollmentsCoursesDto) {
    return this.enrollmentsCoursesService.update(id, body)
  }

}
