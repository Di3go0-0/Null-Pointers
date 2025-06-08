import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ExtensionInstancesRepository } from "../extension-instances.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ExtesionInstanceType } from "../../types/extension-instances.type";
import { ExtensionInstanceMapper } from "../../mappers/extension.mapper";
import { EXTENSION } from "../../constans";
import { GetByStatusExtensionInstancesDto, PatchExtensionInstanceDto, PostExtensionInstanceDto } from "../../dtos";

@Injectable()
export class ExtensionInstancesPrismaService implements ExtensionInstancesRepository {
  private readonly logger = new Logger(ExtensionInstancesPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async findExtensionCoursesInstances(): Promise<ExtesionInstanceType[]> {
    try {
      const courses = await this.prisma.extensionCourseInstance.findMany({
        where: {
          active: true
        }
      })

      return ExtensionInstanceMapper.toDomainList(courses);

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findExtensionCoursesSearch(query: GetByStatusExtensionInstancesDto): Promise<ExtesionInstanceType[]> {
    try {
      const courses = await this.prisma.extensionCourseInstance.findMany({
        where: {
          active: true,
          ...query,
        }
      })

      return ExtensionInstanceMapper.toDomainList(courses);

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveExtensionCourseInstance(body: PostExtensionInstanceDto): Promise<number> {
    try {
      const courses = await this.prisma.extensionCourseInstance.create({
        data: {
          ...body
        }
      })

      return courses.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error uploading course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.CREATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateExtensionCourseInstance(id: number, body: PatchExtensionInstanceDto): Promise<number> {
    try {
      const courses = await this.prisma.extensionCourseInstance.update({
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
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.UPDATED_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteExtensionCourseInstance(id: number): Promise<number> {
    try {
      const courses = await this.prisma.extensionCourseInstance.update({
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
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error Deleting course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existExtensionCourseInstance(courseId: number): Promise<boolean> {
    try {
      const course = await this.prisma.extensionCourseInstance.findUnique({
        where: {
          id: courseId,
          active: true,
        }
      })

      if (!course) {
        throw new HttpException(EXTENSION.ALERT.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
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
        throw new HttpException(EXTENSION.ALERT.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing teacher: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async existExtensionCourse(courseId: number): Promise<boolean> {
    try {
      const course = await this.prisma.extensionCourse.findUnique({
        where: {
          id: courseId,
          active: true,
        }
      })

      if (!course) {
        throw new HttpException(EXTENSION.ALERT.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing course: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.VERIFY_COURSE, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyGroupCode(groupCode: string): Promise<boolean> {
    try {
      const code = await this.prisma.extensionCourseInstance.findFirst({
        where: {
          groupCode,
          active: true,
        }
      })

      if (code) {
        throw new HttpException(EXTENSION.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing groupCode: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.VERIFY_COURSE_CODE, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyGroupCodeOwner(id: number, groupCode: string): Promise<boolean> {
    try {
      const code = await this.prisma.extensionCourseInstance.findFirst({
        where: {
          groupCode,
          active: true,
        },
      })

      // Si no existe ningún curso con ese código, está disponible
      if (!code) {
        return true;
      }

      // Si existe y el id es diferente, significa que el código ya está en uso por otro curso
      if (code.id !== id) {
        throw new HttpException(EXTENSION.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifing groupCode owner: ${error.message}`);
      throw new HttpException(EXTENSION.ERROR.VERIFY_COURSE_CODE_OWNER, HttpStatus.BAD_REQUEST);
    }
  }
}
