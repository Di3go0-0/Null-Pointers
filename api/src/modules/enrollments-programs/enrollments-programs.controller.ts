import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { EnrollmentsProgramsService } from './enrollments-programs.service';
import { PatchEnrollmentsProgramsDto, PostEnrollmentsProgramsDto } from './dtos';
import { GetEnrollmentsProgramsDto } from './dtos/get.enrollments-programs.dto';

@ApiTags('Enrollments Program')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('enrollments-programs')
export class EnrollmentsProgramsController {
  constructor(private readonly enrollmentsProgramsService: EnrollmentsProgramsService) { }

  @Get()
  async Get() {
    return this.enrollmentsProgramsService.find();
  }

  @Get('search')
  async GetSearch(@Query() query: GetEnrollmentsProgramsDto) {
    return this.enrollmentsProgramsService.findSearch(query);
  }

  @Post()
  async Save(@Body() body: PostEnrollmentsProgramsDto) {
    return this.enrollmentsProgramsService.save(body)
  }

  @Patch(':id')
  async Patch(@Param('id', ParseIntPipe) id: number, @Body() body: PatchEnrollmentsProgramsDto) {
    return this.enrollmentsProgramsService.update(id, body);
  }
}
