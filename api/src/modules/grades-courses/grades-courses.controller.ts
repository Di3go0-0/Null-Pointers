import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GradesCoursesService } from './grades-courses.service';
import { PatchGradesDto } from './dtos/patch.grades.dto';
import { PostGradesDto } from './dtos/post.grades.dto';
import { GetGradeDto } from './dtos/get.grades.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Grades')
@Controller('grades-courses')
export class GradesCoursesController {
  constructor(private readonly gradesCoursesService: GradesCoursesService) { }

  @Get()
  async getGrade(@Query() params: GetGradeDto) {
    return this.gradesCoursesService.getGrade(params);
  }


  @Post()
  async postGrade(@Body() body: PostGradesDto) {
    return this.gradesCoursesService.postGrade(body);
  }

  @Patch('/:id')
  async patchGrade(@Param('id', ParseIntPipe) id: number, @Body() body: PatchGradesDto) {
    return this.gradesCoursesService.patchGrade(id, body);
  }
}
