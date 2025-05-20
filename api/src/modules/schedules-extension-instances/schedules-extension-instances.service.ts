import { Injectable } from '@nestjs/common';
import { SchedulesExtensionInstancesRepository } from './repository';
import { ScheduleEntity } from './entities';
import { GetScheduleType, PostScheduleType, PatchScheduleType } from './types';

@Injectable()
export class SchedulesExtensionInstancesService {
  constructor(private readonly schedulesExtensionInstancesRepository: SchedulesExtensionInstancesRepository) { }

  async find(): Promise<ScheduleEntity[]> {
    return await this.schedulesExtensionInstancesRepository.find();
  }

  async findSearch(params: GetScheduleType): Promise<ScheduleEntity[]> {
    return await this.schedulesExtensionInstancesRepository.findSearch(params);
  }

  async save(body: PostScheduleType): Promise<number> {
    await this.schedulesExtensionInstancesRepository.verifyExtensionInstance(body.extensionCourseInstanceId);
    return await this.schedulesExtensionInstancesRepository.save(body);
  }

  async update(id: number, body: PatchScheduleType): Promise<number> {
    if (body.extensionCourseInstanceId) await this.schedulesExtensionInstancesRepository.verifyExtensionInstance(body.extensionCourseInstanceId);
    return await this.schedulesExtensionInstancesRepository.update(id, body);
  }
}
