import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ENROLLMENTS } from "../../constans/enrollments-courses.constans";
import { EnrollmentsMapper } from "../../mappers/enrollments-courses.mapper";
import { EnrollmentsType, GetEnrollmentsCoursesType, PatchEnrollmentsCoursesType, PostEnrollmentsCoursesType } from "../../types";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { EnrollmentsExtensionRepository } from "../enrollments-courses.repository";

@Injectable()
export class EnrollmentsExtensionPrismaService implements EnrollmentsExtensionRepository {
  private readonly logger = new Logger(EnrollmentsExtensionPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async find(): Promise<EnrollmentsType[]> {
    try {
      const enrollments = await this.prisma.extensionCourseEnrollment.findMany()

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
    try {
      const enrollments = await this.prisma.extensionCourseEnrollment.findMany({
        where: {
          ...params,

        },
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
      const enrollment = await this.prisma.extensionCourseEnrollment.create({
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
      const enrollment = await this.prisma.extensionCourseEnrollment.update({
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

  public async existExtensionCourseInstance(id: number): Promise<void> {
    try {
      const courseInstance = await this.prisma.extensionCourseInstance.findFirst({
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

      const enrollment = await this.prisma.extensionCourseInstance.findFirst({
        where: {
          id: courseInstanceId,
        },
        select: {
          extensionCourse: {
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
