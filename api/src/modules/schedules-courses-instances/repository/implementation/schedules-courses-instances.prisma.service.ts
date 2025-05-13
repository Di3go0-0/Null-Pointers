import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { SchedulesCoursesInstancesRepository } from "../schedules-courses-instances.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ScheduleEntity } from "../../entities";
import { GetScheduleType, partialSchedules, PatchScheduleType, PostScheduleType } from "../../types";
import { SCHEDULES } from "../../constans";



@Injectable()
export class SchedulesCoursesInstancesPrismaService implements SchedulesCoursesInstancesRepository {
  private readonly logger = new Logger(SchedulesCoursesInstancesPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async find(): Promise<ScheduleEntity[]> {
    try {
      const schedules = await this.prisma.scheduleCourseInstance.findMany()

      return schedules
    } catch (error) {
      this.logger.error(`Error finding many schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.FIND, HttpStatus.BAD_REQUEST);
    }
  }

  public async findSearch(params: GetScheduleType): Promise<ScheduleEntity[]> {
    try {
      const schedules = await this.prisma.scheduleCourseInstance.findMany({
        where: {
          ...params
        }
      })
      return schedules
    } catch (error) {
      this.logger.error(`Error finding many schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.FIND, HttpStatus.BAD_REQUEST);
    }
  }

  public async save(body: PostScheduleType): Promise<number> {
    try {
      const schedules = await this.prisma.scheduleCourseInstance.create({
        data: {
          ...body
        }
      })

      return schedules.id
    } catch (error) {
      this.logger.error(`Error saving schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.SAVE, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(id: number, body: PatchScheduleType): Promise<number> {
    try {
      const schedules = await this.prisma.scheduleCourseInstance.update({
        where: {
          id,
        },
        data: {
          ...body
        }
      })

      return schedules.id
    } catch (error) {
      this.logger.error(`Error updating schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.UPDATE, HttpStatus.BAD_REQUEST);
    }
  }


  public async schedulesCrossing(props: partialSchedules) {
    const { courseInstanceId, classroom, day, startTime, endTime } = props
    try {
      const courseInstance = await this.prisma.courseInstance.findFirst({
        where: { id: courseInstanceId, active: true },
        select: { semester: true },
      });

      if (!courseInstance) {
        throw new HttpException(SCHEDULES.ERROR.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const overlappingSchedule = await this.prisma.scheduleCourseInstance.findFirst({
        where: {
          classroom,
          day,
          courseInstance: {
            semester: courseInstance.semester,
          },
          // Validar cruce de horarios
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gt: startTime } },
          ],
        },
      });

      if (overlappingSchedule) {
        throw new HttpException(SCHEDULES.ERROR.CLASSROOM_CROSSING, HttpStatus.CONFLICT);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error verifying classroom overlap: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.CLASSROOM, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async courseInstanceId(scheuleId: number): Promise<number> {
    try {
      const scheduleCourse = await this.prisma.scheduleCourseInstance.findFirst({
        where: {
          id: scheuleId,
        }, select: {
          courseInstance: {
            select: {
              id: true,
            }
          }
        }
      })


      if (!scheduleCourse) {
        throw new HttpException(SCHEDULES.ERROR.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return scheduleCourse.courseInstance.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error obtaining course instance id: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.COURSE_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
