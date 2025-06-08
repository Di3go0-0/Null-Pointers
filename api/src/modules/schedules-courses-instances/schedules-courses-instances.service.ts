import { Injectable } from '@nestjs/common';
import { SchedulesCoursesInstancesRepository } from './repository';
import { GetScheduleType, PatchScheduleType, PostScheduleType } from './types';

@Injectable()
export class SchedulesCoursesInstancesService {
  constructor(private readonly schedulesCoursesInstancesRepository: SchedulesCoursesInstancesRepository) { }

  async find() {
    return await this.schedulesCoursesInstancesRepository.find()
  }

  async findSearch(params: GetScheduleType) {
    return await this.schedulesCoursesInstancesRepository.findSearch(params)
  }

  async save(body: PostScheduleType) {
    await this.schedulesCoursesInstancesRepository.schedulesCrossing({
      courseInstanceId: body.courseInstanceId,
      day: body.day,
      startTime: body.startTime,
      endTime: body.endTime,
      classroom: body.classroom,
    })
    return await this.schedulesCoursesInstancesRepository.save(body)
  }

  async update(id: number, body: PatchScheduleType) {
    if (body.day && body.classroom && body.startTime && body.endTime) {
      const courseInstanceId = await this.schedulesCoursesInstancesRepository.courseInstanceId(id);
      await this.schedulesCoursesInstancesRepository.schedulesCrossing({
        courseInstanceId,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
        classroom: body.classroom,
      })
    }
    return await this.schedulesCoursesInstancesRepository.update(id, body)
  }

  async delete(id: number): Promise<number> {
    return await this.schedulesCoursesInstancesRepository.delete(id)
  }
}
