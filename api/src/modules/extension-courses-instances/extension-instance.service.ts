import { Injectable } from '@nestjs/common';
import { ExtensionInstancesRepository } from './repository/extension-instances.repository';
import { GetByStatusExtensionInstancesDto, PostExtensionInstanceDto, PatchExtensionInstanceDto } from './dtos';
import { ExtesionInstanceType } from './types/extension-instances.type';

@Injectable()
export class ExtensionInstancesService {
  constructor(private readonly extensionInstancesRepository: ExtensionInstancesRepository) { }

  async findExtensionCoursesInstances(): Promise<ExtesionInstanceType[]> {
    return await this.extensionInstancesRepository.findExtensionCoursesInstances()
  }

  async findExtensionCoursesSearch(params: GetByStatusExtensionInstancesDto): Promise<ExtesionInstanceType[]> {
    return await this.extensionInstancesRepository.findExtensionCoursesSearch(params);
  }

  async saveExtensionCourseInstance(body: PostExtensionInstanceDto): Promise<number> {
    await this.extensionInstancesRepository.existExtensionCourse(body.extensionCourseId)
    await this.extensionInstancesRepository.existTeacher(body.teacherId);
    await this.extensionInstancesRepository.verifyGroupCode(body.groupCode)
    return await this.extensionInstancesRepository.saveExtensionCourseInstance(body)
  }

  async updateExtensionCourseInstance(id: number, body: PatchExtensionInstanceDto): Promise<number> {
    await this.extensionInstancesRepository.existExtensionCourseInstance(id)
    if (body.extensionCourseId) await this.extensionInstancesRepository.existExtensionCourseInstance(body.extensionCourseId);
    if (body.teacherId) await this.extensionInstancesRepository.existTeacher(body.teacherId);
    if (body.groupCode) await this.extensionInstancesRepository.verifyGroupCodeOwner(id, body.groupCode);
    return await this.extensionInstancesRepository.updateExtensionCourseInstance(id, body);

  }

  async deleteExtensionCourseInstance(id: number): Promise<number> {
    await this.extensionInstancesRepository.existExtensionCourseInstance(id)
    return await this.extensionInstancesRepository.deleteExtensionCourseInstance(id);
  }
}
