import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CoursesInstancesRepository } from "../courses-instances.repository";
import { CourseInstanceType } from "../../types/courses-instances.type";
import { COURSES } from "../../constans";
import { PostCourseInstanceType, PatchCourseInstanceType, GetByStatusCoursesInstancesType } from "../../types";
import { CourseInstanceMapper } from "../../mappers/course.mapper";


export class CoursesInstancesPrismaService implements CoursesInstancesRepository {
  private readonly logger = new Logger(CoursesInstancesPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async findCoursesInstances(): Promise<CourseInstanceType[]> {
    try {
      const courses = await this.prisma.courseInstance.findMany({
        where: {
          active: true
        }
      })

      return CourseInstanceMapper.toDomainList(courses);

    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findCoursesByStatus({ status }: GetByStatusCoursesInstancesType): Promise<CourseInstanceType[]> {
    try {
      const courses = await this.prisma.courseInstance.findMany({
        where: {
          active: true,
          status,
        }
      })

      return CourseInstanceMapper.toDomainList(courses);

    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findCoursesByTeacher(teacherId: number): Promise<CourseInstanceType[]> {
    try {
      const courses = await this.prisma.courseInstance.findMany({
        where: {
          teacherId,
          active: true,
        }
      })

      return CourseInstanceMapper.toDomainList(courses);
    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findCoursesByCourseId(courseId: number): Promise<CourseInstanceType[]> {
    try {
      const courses = await this.prisma.courseInstance.findMany({
        where: {
          courseId,
          active: true,
        }
      })

      return CourseInstanceMapper.toDomainList(courses);
    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findCoursesById(id: number): Promise<CourseInstanceType[]> {
    try {
      const courses = await this.prisma.courseInstance.findMany({
        where: {
          id,
          active: true,
        }
      })

      return CourseInstanceMapper.toDomainList(courses);
    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveCourseInstance(body: PostCourseInstanceType): Promise<number> {
    try {
      const courses = await this.prisma.courseInstance.create({
        data: {
          ...body
        }
      })

      return courses.id
    } catch (error) {
      this.logger.error(`Error uploading course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.CREATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCourseInstance(id: number, body: PatchCourseInstanceType): Promise<number> {
    try {
      const courses = await this.prisma.courseInstance.update({
        where: {
          id,
          active: true,
        },
        data: {
          ...body
        }
      })

      return courses.id
    } catch (error) {
      this.logger.error(`Error updating course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.UPDATED_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteCourseInstance(id: number): Promise<number> {
    try {
      const courses = await this.prisma.courseInstance.update({
        where: {
          id,
          active: true,
        },
        data: {
          active: false,
        }
      })

      return courses.id
    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existCourseInstance(courseId: number): Promise<boolean> {
    try {
      const course = await this.prisma.courseInstance.findUnique({
        where: {
          id: courseId,
          active: true,
        }
      })

      if (!course) {
        throw new HttpException(COURSES.ALERT.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true

    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existTeacher(teacherId: number): Promise<boolean> {
    try {
      const teacher = await this.prisma.teacher.findUnique({
        where: {
          id: teacherId,
          user: {
            active: true,
          }
        }
      })

      if (!teacher) {
        throw new HttpException(COURSES.ALERT.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existCourse(courseId: number): Promise<boolean> {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          active: true,
        }
      })

      if (!course) {
        throw new HttpException(COURSES.ALERT.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyGroupCode(groupCode: string, semester: string): Promise<boolean> {
    try {
      const code = await this.prisma.courseInstance.findFirst({
        where: {
          groupCode,
          semester,
          active: true,
        }
      })

      if (code) {
        throw new HttpException(COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyGroupCodeOwner(courseId: number, groupCode: string): Promise<boolean> {
    try {
      const group = await this.prisma.courseInstance.findFirst({
        where: {
          id: courseId,
          active: true,
        },
        select: {
          semester: true
        }
      })

      const code = await this.prisma.courseInstance.findFirst({
        where: {
          id: courseId,
          groupCode,
          semester: group?.semester,
          active: true,
        }
      })

      if (code) {
        throw new HttpException(COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
}
