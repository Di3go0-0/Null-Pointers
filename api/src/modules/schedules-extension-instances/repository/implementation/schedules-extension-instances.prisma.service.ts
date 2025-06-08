import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { SchedulesExtensionInstancesRepository } from "../schedules-extension-instances.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ScheduleEntity } from "../../entities";
import { GetScheduleType, PatchScheduleType, PostScheduleType } from "../../types";
import { SCHEDULES } from "../../constans";

@Injectable()
export class SchedulesExtensionInstancesPrismaService implements SchedulesExtensionInstancesRepository {
  private readonly logger = new Logger(SchedulesExtensionInstancesPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async find(): Promise<ScheduleEntity[]> {
    try {
      const schedules = await this.prisma.scheduleExtensionCourseInstance.findMany()

      return schedules
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error finding many schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.FIND, HttpStatus.BAD_REQUEST);
    }
  }

  public async findSearch(params: GetScheduleType): Promise<ScheduleEntity[]> {

    try {
      const schedules = await this.prisma.scheduleExtensionCourseInstance.findMany({
        where: {
          ...params,

        }
      })
      return schedules
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error finding many schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.FIND, HttpStatus.BAD_REQUEST);
    }
  }

  public async save(body: PostScheduleType): Promise<number> {
    try {
      const schedules = await this.prisma.scheduleExtensionCourseInstance.create({
        data: {
          ...body
        }
      })

      return schedules.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error saving schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.SAVE, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(id: number, body: PatchScheduleType): Promise<number> {
    try {
      const schedules = await this.prisma.scheduleExtensionCourseInstance.update({
        where: {
          id,
        },
        data: {
          ...body
        }
      })

      return schedules.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.UPDATE, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyExtensionInstance(extensionCourseInstanceId: number): Promise<void> {
    try {
      const extensionInstance = await this.prisma.extensionCourseInstance.findFirst({
        where: {
          id: extensionCourseInstanceId,
          active: true,
        }
      })

      if (!extensionInstance) {
        throw new HttpException(SCHEDULES.ERROR.COURSE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      if (error instanceof HttpException) { throw error; }

      this.logger.error(`Error updating schedules: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.FIND, HttpStatus.BAD_REQUEST);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      const scheduleCourse = await this.prisma.scheduleExtensionCourseInstance.delete({
        where: { id }
      })

      return scheduleCourse.id;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error deleting schedule: ${error.message}`);
      throw new HttpException(SCHEDULES.ERROR.DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

