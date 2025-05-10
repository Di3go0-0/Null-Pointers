import { Injectable } from '@nestjs/common';
import { CoursesInstancesRepository } from './repository/courses-instances.repository';
import { GetByStatusCoursesInstancesType, PostCourseInstanceType, PatchCourseInstanceType } from './types';
import { CourseInstanceType } from './types/courses-instances.type';

@Injectable()
export class CoursesInstancesService {
  constructor(private readonly coursesInstancesRepository: CoursesInstancesRepository) { }

  async findCoursesInstances(): Promise<CourseInstanceType[]> {
    return this.coursesInstancesRepository.findCoursesInstances();
  }

  async findCoursesByStatus({ status }: GetByStatusCoursesInstancesType): Promise<CourseInstanceType[]> {
    return this.coursesInstancesRepository.findCoursesByStatus({ status })
  }

  async findCoursesByTeacher(teacherId: number): Promise<CourseInstanceType[]> {
    this.coursesInstancesRepository.existTeacher(teacherId);
    return this.coursesInstancesRepository.findCoursesByTeacher(teacherId);
  }

  async findCoursesByCourseId(courseId: number): Promise<CourseInstanceType[]> {
    this.coursesInstancesRepository.existCourse(courseId);
    return this.coursesInstancesRepository.findCoursesByCourseId(courseId);
  }

  async findCoursesById(id: number): Promise<CourseInstanceType[]> {
    this.coursesInstancesRepository.existCourseInstance(id);
    return this.coursesInstancesRepository.findCoursesById(id);
  }

  async saveCourseInstance(body: PostCourseInstanceType): Promise<number> {
    this.coursesInstancesRepository.verifyGroupCode(body.groupCode, body.semester);
    return this.coursesInstancesRepository.saveCourseInstance(body);
  }

  async updateCourseInstance(id: number, body: PatchCourseInstanceType): Promise<number> {
    this.coursesInstancesRepository.existCourseInstance(id);
    if (body.groupCode) this.coursesInstancesRepository.verifyGroupCodeOwner(id, body.groupCode)
    return this.coursesInstancesRepository.updateCourseInstance(id, body);

  }

  async deleteCourseInstance(id: number): Promise<number> {
    this.coursesInstancesRepository.existCourseInstance(id);
    return this.coursesInstancesRepository.deleteCourseInstance(id);
  }
}
