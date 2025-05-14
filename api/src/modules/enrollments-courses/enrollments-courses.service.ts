import { Injectable } from '@nestjs/common';
import { EnrollmentsCoursesRepository } from './repository';
import { EnrollmentsType, GetEnrollmentsCoursesType, PatchEnrollmentsCoursesType, PostEnrollmentsCoursesType } from './types';

@Injectable()
export class EnrollmentsCoursesService {
  constructor(private readonly enrollmentsCoursesRepository: EnrollmentsCoursesRepository) { }

  async find(): Promise<EnrollmentsType[]> {
    return this.enrollmentsCoursesRepository.find();
  }
  async findSearch(params: GetEnrollmentsCoursesType): Promise<EnrollmentsType[]> {
    return this.enrollmentsCoursesRepository.findSearch(params);
  }

  async save(body: PostEnrollmentsCoursesType): Promise<number> {
    await this.enrollmentsCoursesRepository.existStudent(body.studentId);
    await this.enrollmentsCoursesRepository.existCourseInstance(body.courseInstanceId)
    await this.enrollmentsCoursesRepository.existEnrollmentAcademic(body.studentId, body.courseInstanceId)
    return this.enrollmentsCoursesRepository.save(body);
  }
  async update(id: number, body: PatchEnrollmentsCoursesType): Promise<number> {
    if (body.studentId) await this.enrollmentsCoursesRepository.existStudent(body.studentId);
    if (body.courseInstanceId) await this.enrollmentsCoursesRepository.existCourseInstance(body.courseInstanceId)
    return this.enrollmentsCoursesRepository.update(id, body)
  }
}
