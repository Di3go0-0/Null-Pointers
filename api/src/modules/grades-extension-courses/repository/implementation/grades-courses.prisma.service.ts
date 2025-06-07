import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { GradeCourseRepository } from "../grades-courses.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PostGradesType } from "../../types/post.grades.type";
import { PatchGradesType } from "../../types/patch.grades.type";
import { GRADES } from "../../constants/grades.constans";
import { GetGradeType } from "../../types/get.grades.type";
import { GradeMapper } from "../../mappers/grades.mapper";
import { GradesType } from "../../types/grades.type";

@Injectable()
export class GradeCourseRepositoryPrismaService implements GradeCourseRepository {
  private readonly logger = new Logger(GradeCourseRepositoryPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getGrade(params: GetGradeType): Promise<GradesType[]> {
    try {
      const grade = await this.prisma.extensionCourseGrade.findMany({
        where: {
          id: params.id,
          extensionCourseEnrollmentId: params.extensionCourseEnrollmentId,
          extensionCourseEnrollment: {
            studentId: params.studentId,
            extensionCourseInstanceId: params.extensionCourseInstanceId,
          }
        },
        include: {
          extensionCourseEnrollment: {
            include: {
              student: true,
            }
          }
        }
      })

      this.logger.debug(grade)

      return GradeMapper.toDomainList(grade)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error get Grade: ${error.message}`);
      throw new HttpException(GRADES.ERROR.GET_GRADES, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async postGrade(body: PostGradesType): Promise<number> {
    try {
      const grade = await this.prisma.extensionCourseGrade.create({
        data: { ...body, }
      })

      return grade.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error post Grade: ${error.message}`);
      throw new HttpException(GRADES.ERROR.CREATE_GRADES, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async patchGrade(id: number, body: PatchGradesType): Promise<number> {
    try {
      const grade = await this.prisma.extensionCourseGrade.update({
        where: { id },
        data: { ...body }
      })

      return grade.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error patch Grade: ${error.message}`);
      throw new HttpException(GRADES.ERROR.UPDATED_GRADES, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existExtensionGradeCourse(id: number): Promise<void> {
    try {
      const exitGrade = await this.prisma.extensionCourseGrade.findUnique({
        where: { id }
      })

      if (!exitGrade) {
        throw new HttpException(GRADES.ERROR.FIND_GRADE, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error post Grade: ${error.message}`);
      throw new HttpException(GRADES.ERROR.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async existExtesionEnrollmentCourse(id: number): Promise<void> {
    try {
      const enrollment = await this.prisma.extensionCourseEnrollment.findUnique({
        where: { id }
      })

      if (!enrollment) {
        throw new HttpException(GRADES.ERROR.FIND_ENROLLMENT_COURSE, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error post Grade: ${error.message}`);
      throw new HttpException(GRADES.ERROR.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
