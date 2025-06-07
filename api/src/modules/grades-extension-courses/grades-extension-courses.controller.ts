import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GradesCoursesService } from './grades-extension-courses.service';
import { PatchGradesDto } from './dtos/patch.grades.dto';
import { PostGradesDto } from './dtos/post.grades.dto';
import { GetGradeDto } from './dtos/get.grades.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Extension Course Grades')
@Controller('grades-extesnion-courses')
export class GradesExtensionCoursesController {
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
