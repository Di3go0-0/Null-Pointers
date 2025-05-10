import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PatchExtensionCoursesDto, PostExtensionCoursesDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { Roles } from 'src/shared';
import { ExtensionCoursesService } from './extension-courses.service';

@ApiTags('Extension Courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('extension-courses')
export class ExtensionCoursesController {
  constructor(private readonly extensionCoursesService: ExtensionCoursesService) { }

  @Get('academic-program/:programId')
  async findCourseByAcademicProgram(@Param('programId') programId: number) {
    return this.extensionCoursesService.findExtensionCourseByAcademicProgram(programId);
  }

  @Get()
  async findCourses() {
    return this.extensionCoursesService.findExtensionCourses();
  }

  @Get(':id')
  async findCourseById(@Param('id') id: number) {
    return this.extensionCoursesService.findExtensionCourseById(id);
  }

  @Post()
  async saveCourse(@Body() body: PostExtensionCoursesDto) {
    return this.extensionCoursesService.saveExtensionCourse(body);
  }

  @Patch(':id')
  async updateCourse(@Param('id') id: number, @Body() body: PatchExtensionCoursesDto) {
    return this.extensionCoursesService.updateExtensionCourse(id, body);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return this.extensionCoursesService.deleteExtensionCourse(id);
  }

}
