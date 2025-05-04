import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { TeachersService } from './teachers.service';
import { PatchTeacherDTO, PostTeacherDTO } from './dtos';
import { Roles } from 'src/shared';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';

@ApiTags('Teachers')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN', 'TEACHER')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Get()
  async getTeachers() {
    return this.teachersService.getTeachers();
  }
  @Get('/:id')
  async getTeacherById(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.getTeacherById(id)
  }

  @Post(':id')
  async creteTeacher(@Param('id', ParseIntPipe) id: number, @Body() body: PostTeacherDTO) {
    return this.teachersService.postTeacher(id, body);
  }

  @Patch(':id')
  async patchTeacher(@Param('id', ParseIntPipe) id: number, @Body() body: PatchTeacherDTO) {
    return this.teachersService.patchTeacher(id, body)
  }
}
