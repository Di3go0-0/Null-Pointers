import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { StudentsService } from './students.service';
import { RegisterDto } from '../auth/dto';

@ApiTags('Students')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Get()
  async getStudents() {
    return this.studentsService.getStudents();
  }
  @Get('/:id')
  async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudentById(id)
  }

  @Post()
  async creteStudent(@Body() body: RegisterDto) {
    const { confirmPassword, ...body1 } = body
    return this.studentsService.postStudent(body1);
  }
}
