import { Injectable } from '@nestjs/common';
import { ExtensionCoursesRepository } from './repository';
import { ExtensionCourseType, PatchExtensionCousrsesType, PostExtensionCoursesType } from './types';

@Injectable()
export class ExtensionCoursesService {
  constructor(private readonly coursesRepository: ExtensionCoursesRepository) { }

  async findExtensionCourseByAcademicProgram(programId: number): Promise<ExtensionCourseType[]> {
    await this.coursesRepository.validateAcademicProgram(programId);
    return this.coursesRepository.findExtensionCourseByAcademicProgram(programId);
  }

  async findExtensionCourses(): Promise<ExtensionCourseType[]> {
    return this.coursesRepository.findExtensionCourses();
  }

  async findExtensionCourseById(id: number): Promise<ExtensionCourseType[]> {
    await this.coursesRepository.existExtensionCourse(id);
    return this.coursesRepository.findExtensionCourseById(id);
  }

  async saveExtensionCourse(body: PostExtensionCoursesType): Promise<number> {
    await this.coursesRepository.validateAcademicProgram(body.programId);
    await this.coursesRepository.validateExtensionCourseCode(body.courseCode)
    return this.coursesRepository.saveExtensionCourse(body);
  }

  async updateExtensionCourse(id: number, body: PatchExtensionCousrsesType): Promise<number> {
    await this.coursesRepository.existExtensionCourse(id);
    if (body.programId) await this.coursesRepository.validateAcademicProgram(body.programId)
    if (body.courseCode)
      await this.coursesRepository.validateExtensionCourseCodeOwner(id, body.courseCode)

    return this.coursesRepository.updateExtensionCourse(id, body);
  }

  async deleteExtensionCourse(id: number): Promise<number> {
    await this.coursesRepository.existExtensionCourse(id);
    return this.coursesRepository.deleteExtensionCourse(id);
  }
}
