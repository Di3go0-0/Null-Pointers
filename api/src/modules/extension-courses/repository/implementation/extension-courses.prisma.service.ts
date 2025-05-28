import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { EXTENSION_COURSES } from "../../constanst";
import { ExtensionCourseMapper } from "../../mappers/extension-courses.mapper";
import { ExtensionCoursesRepository } from "../extension-courses.repository";
import { ExtensionCourseType, PostExtensionCoursesType, PatchExtensionCousrsesType } from "../../types";

@Injectable()
export class ExtensionCoursesProgramsPrismaService implements ExtensionCoursesRepository {
  private readonly logger = new Logger(ExtensionCoursesProgramsPrismaService.name);
  constructor(private prisma: PrismaService) { }


  public async findExtensionCourseByAcademicProgram(programId: number): Promise<ExtensionCourseType[]> {
    try {
      const course = await this.prisma.extensionCourse.findMany({
        where: {
          programId,
          active: true
        }
      })

      return ExtensionCourseMapper.toDomainList(course);
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findExtensionCourses(): Promise<ExtensionCourseType[]> {
    try {
      const courses = await this.prisma.extensionCourse.findMany({
        where: {
          active: true
        }
      })

      return ExtensionCourseMapper.toDomainList(courses)
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findExtensionCourseById(id: number): Promise<ExtensionCourseType[]> {
    try {
      const courses = await this.prisma.extensionCourse.findMany({
        where: {
          id,
          active: true
        }
      })

      return ExtensionCourseMapper.toDomainList(courses)
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveExtensionCourse(body: PostExtensionCoursesType): Promise<number> {
    try {
      const courseSave = await this.prisma.extensionCourse.create({
        data: {
          ...body
        }
      })

      return courseSave.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error creating course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.CREATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateExtensionCourse(id: number, body: PatchExtensionCousrsesType): Promise<number> {
    try {
      const courseUpdated = await this.prisma.extensionCourse.update({
        where: {
          id,
          active: true,
        },
        data: {
          ...body
        }
      })

      return courseUpdated.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.UPDATED_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteExtensionCourse(id: number): Promise<number> {
    try {
      const courseDeleted = await this.prisma.extensionCourse.update({
        where: {
          id,
          active: true,
        },
        data: {
          active: false,
        }
      })

      return courseDeleted.id;
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error deleting course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateExtensionCourseCode(courseCode: string): Promise<boolean> {
    try {
      const existingCourse = await this.prisma.extensionCourse.findUnique({
        where: {
          // active: true,
          courseCode,
        }
      })

      if (existingCourse) {
        throw new HttpException(EXTENSION_COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error validating course code: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateAcademicProgram(academicId: number): Promise<boolean> {
    try {
      const academicProgram = await this.prisma.academicProgram.findUnique({
        where: {
          id: academicId,
          active: true,
        }
      })

      if (!academicProgram) {
        throw new HttpException(EXTENSION_COURSES.ALERT.PROGRAM_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Error validating academic program [${academicId}]: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateExtensionCourseCodeOwner(id: number, courseCode: string): Promise<boolean> {
    try {
      const course = await this.prisma.extensionCourse.findMany({
        where: {
          active: true,
          courseCode,
        },
        select: {
          id: true
        }
      })

      if (course[0].id !== id) {
        throw new HttpException(EXTENSION_COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating course code : ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existExtensionCourse(id: number): Promise<boolean> {
    try {
      const course = await this.prisma.extensionCourse.findUnique({
        where: {
          id,
          active: true
        }
      })

      if (!course) {
        throw new HttpException(EXTENSION_COURSES.ALERT.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error validating course: ${error.message}`);
      throw new HttpException(EXTENSION_COURSES.ERROR.FIND_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
}

