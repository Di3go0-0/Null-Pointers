import { Injectable } from '@nestjs/common';
import { CoursesInstancesRepository } from './repository/courses-instances.repository';
import { GetByStatusCoursesInstancesType, PostCourseInstanceType, PatchCourseInstanceType } from './types';
import { CourseInstanceType } from './types/courses-instances.type';

@Injectable()
export class CoursesInstancesService {
  constructor(private readonly coursesInstancesRepository: CoursesInstancesRepository) { }

  async findCoursesInstances(): Promise<CourseInstanceType[]> {
    return await this.coursesInstancesRepository.findCoursesInstances();
  }

  async findCoursesByStatus({ status }: GetByStatusCoursesInstancesType): Promise<CourseInstanceType[]> {
    return await this.coursesInstancesRepository.findCoursesByStatus({ status })
  }

  // async findCoursesByTeacher(teacherId: number): Promise<CourseInstanceType[]> {
  //   return this.coursesInstancesRepository.findCoursesByTeacher(teacherId);
  // }
  //
  // async findCoursesByCourseId(courseId: number): Promise<CourseInstanceType[]> {
  //   return this.coursesInstancesRepository.findCoursesByCourseId(courseId);
  // }
  //
  // async findCoursesById(id: number): Promise<CourseInstanceType[]> {
  //   return this.coursesInstancesRepository.findCoursesById(id);
  // }

  async saveCourseInstance(body: PostCourseInstanceType): Promise<number> {
    await this.coursesInstancesRepository.existTeacher(body.teacherId);
    await this.coursesInstancesRepository.existCourse(body.courseId);
    await this.coursesInstancesRepository.verifyGroupCode(body.groupCode, body.semester);
    return await this.coursesInstancesRepository.saveCourseInstance(body);
  }

  async updateCourseInstance(id: number, body: PatchCourseInstanceType): Promise<number> {
    await this.coursesInstancesRepository.existCourseInstance(id);
    if (body.teacherId) await this.coursesInstancesRepository.existTeacher(body.teacherId)
    if (body.groupCode) await this.coursesInstancesRepository.verifyGroupCodeOwner(id, body.groupCode);

    return await this.coursesInstancesRepository.updateCourseInstance(id, body);
  }

  async deleteCourseInstance(id: number): Promise<number> {
    await this.coursesInstancesRepository.existCourseInstance(id);
    return await this.coursesInstancesRepository.deleteCourseInstance(id);
  }
}
