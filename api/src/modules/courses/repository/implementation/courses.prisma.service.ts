import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CoursesRepository } from "../courses.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CourseType, PatchCousrsesType, PostCoursesType } from "../../types";
import { COURSES } from "../../constanst";
import { CourseMapper } from "../../mappers/academic-programs.mapper";

@Injectable()
export class CoursesProgramsPrismaService implements CoursesRepository {
  private readonly logger = new Logger(CoursesProgramsPrismaService.name);
  constructor(private prisma: PrismaService) { }


  public async findCourseByAcademicProgram(programId: number): Promise<CourseType[]> {
    try {
      const course = await this.prisma.course.findMany({
        where: {
          programId,
          active: true
        }
      })

      return CourseMapper.toDomainList(course);
    }
    catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
  public async findCourses(): Promise<CourseType[]> {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          active: true
        }
      })

      return CourseMapper.toDomainList(courses)
    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async findCourseById(id: number): Promise<CourseType[]> {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          id,
          active: true
        }
      })

      return CourseMapper.toDomainList(courses)
    } catch (error) {
      this.logger.error(`Error getting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.GET_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveCourse(body: PostCoursesType): Promise<number> {
    try {
      const courseSave = await this.prisma.course.create({
        data: {
          ...body
        }
      })

      return courseSave.id
    } catch (error) {
      this.logger.error(`Error creating course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.CREATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateCourse(id: number, body: PatchCousrsesType): Promise<number> {
    try {
      const courseUpdated = await this.prisma.course.update({
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
      this.logger.error(`Error updating course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.UPDATED_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteCourse(id: number): Promise<number> {
    try {
      const courseDeleted = await this.prisma.course.update({
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
      this.logger.error(`Error deleting course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.DELETE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateCourseCode(courseCode: string): Promise<boolean> {
    try {
      const existingCourse = await this.prisma.course.findUnique({
        where: {
          // active: true,
          courseCode,
        }
      })

      if (existingCourse) {
        throw new HttpException(COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error validating course code: ${error.message}`);
      throw new HttpException(COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
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
        throw new HttpException(COURSES.ALERT.PROGRAM_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Error validating academic program [${academicId}]: ${error.message}`);
      throw new HttpException(COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateCourseCodeOwner(id: number, courseCode: string): Promise<boolean> {
    try {
      const course = await this.prisma.course.findMany({
        where: {
          active: true,
          courseCode,
        },
        select: {
          id: true
        }
      })

      if (course[0].id !== id) {
        throw new HttpException(COURSES.ALERT.COURSE_CODE, HttpStatus.CONFLICT);
      }

      return true
    } catch (error) {
      this.logger.error(`Error updating course code : ${error.message}`);
      throw new HttpException(COURSES.ERROR.VALIDATE_COURSES, HttpStatus.BAD_REQUEST);
    }
  }

  public async existCourse(id: number): Promise<boolean> {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id,
          active: true
        }
      })

      if (!course) {
        throw new HttpException(COURSES.ALERT.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      this.logger.error(`Error validating course: ${error.message}`);
      throw new HttpException(COURSES.ERROR.FIND_COURSES, HttpStatus.BAD_REQUEST);
    }
  }
}

