import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EnrollmentsCoursesRepository } from "../enrollments-courses.repository";
import { ENROLLMENTS } from "../../constans/enrollments-courses.constans";
import { EnrollmentsMapper } from "../../mappers/enrollments-courses.mapper";
import { EnrollmentsType, GetEnrollmentsCoursesType, PatchEnrollmentsCoursesType, PostEnrollmentsCoursesType } from "../../types";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class EnrollmentsCoursesPrismaService implements EnrollmentsCoursesRepository {
  private readonly logger = new Logger(EnrollmentsCoursesPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async find(): Promise<EnrollmentsType[]> {
    try {
      const enrollments = await this.prisma.enrollmentCourse.findMany({
        select: {
          id: true,
          status: true,
          studentId: true,
          courseInstanceId: true,
          enrollmentDate: true,
          courseInstance: {
            select: {
              semester: true,
            }
          }
        }
      })

      return EnrollmentsMapper.toDomainList(enrollments)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error obtaining Enrollments: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.FIND, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findSearch(params: GetEnrollmentsCoursesType): Promise<EnrollmentsType[]> {
    const { semester, ...params1 } = params
    try {
      const enrollments = await this.prisma.enrollmentCourse.findMany({
        where: {
          ...params1,
          courseInstance: {
            semester,
          }
        },
        select: {
          id: true,
          status: true,
          studentId: true,
          courseInstanceId: true,
          enrollmentDate: true,
          courseInstance: {
            select: {
              semester: true,
            }
          }
        }
      })

      return EnrollmentsMapper.toDomainList(enrollments)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error obtaining Enrollments: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.FIND, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async save(body: PostEnrollmentsCoursesType): Promise<number> {
    try {
      const enrollment = await this.prisma.enrollmentCourse.create({
        data: {
          ...body,
        }
      })

      return enrollment.id
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error sabing Enrollment: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.SAVE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async update(id: number, body: PatchEnrollmentsCoursesType): Promise<number> {
    try {
      const enrollment = await this.prisma.enrollmentCourse.update({
        where: {
          id,
        },
        data: {
          ...body,
        }
      })

      return enrollment.id
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error updating Enrollments: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existStudent(id: number): Promise<void> {
    try {

      const user = await this.prisma.student.findFirst({
        where: {
          id,
          user: {
            active: true,
          }
        }
      })

      if (!user) {
        throw new HttpException(ENROLLMENTS.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing user: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.USER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existCourseInstance(id: number): Promise<void> {
    try {
      const courseInstance = await this.prisma.courseInstance.findFirst({
        where: {
          id,
          active: true,
        }
      })

      if (!courseInstance) {
        throw new HttpException(ENROLLMENTS.ERROR.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing course: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.COURSE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existEnrollmentAcademic(userId: number, courseInstanceId: number): Promise<void> {
    try {

      const enrollment = await this.prisma.courseInstance.findFirst({
        where: {
          id: courseInstanceId,
        },
        select: {
          course: {
            select: {
              programId: true,
              program: {
                select: {
                  enrollmentsPrograms: {
                    where: {
                      studentId: userId,
                      status: 'Enrolled'
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!enrollment) {
        throw new HttpException(ENROLLMENTS.ERROR.ACADEMIC_PROGRAMS_ENOLLMENT, HttpStatus.CONFLICT);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing Enrollment Academic Program: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.COURSE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
