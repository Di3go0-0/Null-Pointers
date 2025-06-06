import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { PatchCoursesDto, PostCoursesDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { Roles } from 'src/shared';

@ApiTags('Courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get('academic-program/:programId')
  async findCourseByAcademicProgram(@Param('programId') programId: number) {
    return this.coursesService.findCourseByAcademicProgram(programId);
  }

  @Get()
  async findCourses() {
    return this.coursesService.findCourses();
  }

  @Get(':id')
  async findCourseById(@Param('id') id: number) {
    return this.coursesService.findCourseById(id);
  }

  @Post()
  async saveCourse(@Body() body: PostCoursesDto) {
    return this.coursesService.saveCourse(body);
  }

  @Patch(':id')
  async updateCourse(@Param('id') id: number, @Body() body: PatchCoursesDto) {
    return this.coursesService.updateCourse(id, body);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return this.coursesService.deleteCourse(id);
  }

}
