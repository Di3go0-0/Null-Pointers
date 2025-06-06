import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { EnrollmentsExtensionService } from './enrollments-extension.service';
import { GetEnrollmentsCoursesDto, PostEnrollmentsExtensionDto, PatchEnrollmentsCoursesDto } from './dtos';

@ApiTags('Enrollments Extension courses')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService
  // , RolesGuard
)
// @Roles('ADMIN')
@Controller('enrollments-extension')
export class EnrollmentsExtensionController {
  constructor(private readonly enrollmentsExtensionService: EnrollmentsExtensionService) { }

  @Get()
  async GetEnrollmentsCourses() {
    return this.enrollmentsExtensionService.find()
  }

  @Get('search')
  async searchEnrollments(@Query() query: GetEnrollmentsCoursesDto) {
    return this.enrollmentsExtensionService.findSearch(query);
  }

  @Post()
  async SaveEnrollmentsCourses(@Body() body: PostEnrollmentsExtensionDto) {
    return this.enrollmentsExtensionService.save(body)
  }

  @Patch(':id')
  async PatchEnrollmentsCourses(@Param('id', ParseIntPipe) id: number, @Body() body: PatchEnrollmentsCoursesDto) {
    return this.enrollmentsExtensionService.update(id, body)
  }

}

