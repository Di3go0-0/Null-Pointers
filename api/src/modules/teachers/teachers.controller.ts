import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { TeachersService } from './teachers.service';
import { PatchTeacherDTO, PostTeacherDTO } from './dtos';

@ApiTags('Teachers')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Get()
  async getTeachers() {
    return this.teachersService.getTeachers();
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
