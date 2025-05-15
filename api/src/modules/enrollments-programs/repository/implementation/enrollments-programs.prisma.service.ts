import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EnrollmentsProgramsRepository } from "../enrollments-programs.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ENROLLMENTS } from "../../constans/enrollments-courses.constans";
import { EnrollmentsMapper } from "../../mappers/enrollments-programs.mapper";
import { EnrollmentsProgramsType, PatchEnrollmentsProgramsType, PostEnrollmentsProgramsType } from "../../types";
import { GetEnrollmentsProgramsType } from "../../types/get.enrollments-programs.type";

@Injectable()
export class EnrollmentsProgramsPrismaService implements EnrollmentsProgramsRepository {
  private readonly logger = new Logger(EnrollmentsProgramsPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async find(): Promise<EnrollmentsProgramsType[]> {
    try {
      const enrollments = await this.prisma.enrollmentProgram.findMany({
        select: {
          id: true,
          studentId: true,
          academicProgramId: true,
          status: true,
          enrollmentDate: true,
          academicProgram: {
            select: {
              programName: true,
            }
          },
          student: {
            select: {
              user: {
                select: {
                  name: true,
                }
              }
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

  public async findSearch(params: GetEnrollmentsProgramsType): Promise<EnrollmentsProgramsType[]> {
    try {
      const enrollments = await this.prisma.enrollmentProgram.findMany({
        where: {
          ...params,
        },
        select: {
          id: true,
          studentId: true,
          academicProgramId: true,
          status: true,
          enrollmentDate: true,
          academicProgram: {
            select: {
              programName: true,
            }
          },
          student: {
            select: {
              user: {
                select: {
                  name: true,
                }
              }
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

  public async save(body: PostEnrollmentsProgramsType): Promise<number> {
    try {
      const enrollment = await this.prisma.enrollmentProgram.create({
        data: {
          ...body,
        }
      })

      return enrollment.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error saving Enrollments: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.SAVE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async update(id: number, body: PatchEnrollmentsProgramsType): Promise<number> {
    try {
      const enrollment = await this.prisma.enrollmentProgram.update({
        where: {
          id,
        },
        data: {
          ...body,
        }
      })

      return enrollment.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error updating Enrollments: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async studentAlreadyEnrollment(studentId: number, academicProgramId: number): Promise<void> {
    try {
      const enrollment = await this.prisma.enrollmentProgram.findFirst({
        where: {
          academicProgramId,
          studentId,
        }
      })

      if (enrollment) {
        throw new HttpException(ENROLLMENTS.ERROR.USER_ALREADY_ENROLLMENT, HttpStatus.CONFLICT);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error searching exist User course: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.USER, HttpStatus.INTERNAL_SERVER_ERROR);
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
      this.logger.error(`Error searching exist User course: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.USER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existAcademicProgram(id: number): Promise<void> {
    try {
      const academicProgram = await this.prisma.academicProgram.findFirst({
        where: {
          id,
          active: true,
        }
      })
      if (!academicProgram) {
        throw new HttpException(ENROLLMENTS.ERROR.ACADEMIC_PROGRAM_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error searching academicProgram: ${error.message}`);
      throw new HttpException(ENROLLMENTS.ERROR.ACADEMIC_PROGRAM, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
