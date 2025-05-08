import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './repository';
import { CourseEntity } from './entities';
import { PatchCousrsesType, PostCoursesType } from './types';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) { }

  async findCourseByAcademicProgram(programId: number): Promise<CourseEntity[]> {
    await this.coursesRepository.validateAcademicProgram(programId);
    return this.coursesRepository.findCourseByAcademicProgram(programId);
  }

  async findCourses(): Promise<CourseEntity[]> {
    return this.coursesRepository.findCourses();
  }

  async findCourseById(id: number): Promise<CourseEntity[]> {
    await this.coursesRepository.existCourse(id);
    return this.coursesRepository.findCourseById(id);
  }

  async saveCourse(body: PostCoursesType): Promise<number> {
    await this.coursesRepository.validateAcademicProgram(body.programId);
    await this.coursesRepository.validateCourseCode(body.courseCode)
    return this.coursesRepository.saveCourse(body);
  }

  async updateCourse(id: number, body: PatchCousrsesType): Promise<number> {
    await this.coursesRepository.existCourse(id);
    if (body.programId) await this.coursesRepository.validateAcademicProgram(body.programId)
    if (body.courseCode)
      await this.coursesRepository.validateCourseCodeOwner(id, body.courseCode)

    return this.coursesRepository.updateCourse(id, body);
  }

  async deleteCourse(id: number): Promise<number> {
    await this.coursesRepository.existCourse(id);
    return this.coursesRepository.deleteCourse(id);
  }

}
