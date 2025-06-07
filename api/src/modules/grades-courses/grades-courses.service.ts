import { Injectable } from '@nestjs/common';
import { GradeCourseRepository } from './repository/grades-courses.repository';
import { PostGradesType } from './types/post.grades.type';
import { PatchGradesType } from './types/patch.grades.type';
import { GetGradeType } from './types/get.grades.type';

@Injectable()
export class GradesCoursesService {
  constructor(private readonly gradeCourseRepository: GradeCourseRepository) { }

  async getGrade(params: GetGradeType) {
    return await this.gradeCourseRepository.getGrade(params);
  }

  async postGrade(body: PostGradesType): Promise<number> {
    await this.gradeCourseRepository.existEnrollmentCourse(body.enrollmentCourseId);
    return await this.gradeCourseRepository.postGrade(body)
  }

  async patchGrade(id: number, body: PatchGradesType): Promise<number> {
    await this.gradeCourseRepository.existGradeCourse(id);
    return await this.gradeCourseRepository.patchGrade(id, body);
  }
}
