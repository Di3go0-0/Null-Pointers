import { Injectable } from '@nestjs/common';
import { EnrollmentsExtensionRepository } from './repository';
import { EnrollmentsType, GetEnrollmentsCoursesType, PostEnrollmentsCoursesType, PatchEnrollmentsCoursesType } from './types';

@Injectable()
export class EnrollmentsExtensionService {
  constructor(private readonly EnrollmentsExtensionRepository: EnrollmentsExtensionRepository) { }

  async find(): Promise<EnrollmentsType[]> {
    return this.EnrollmentsExtensionRepository.find();
  }

  async findSearch(params: GetEnrollmentsCoursesType): Promise<EnrollmentsType[]> {
    return this.EnrollmentsExtensionRepository.findSearch(params);
  }

  async save(body: PostEnrollmentsCoursesType): Promise<number> {
    return this.EnrollmentsExtensionRepository.save(body);
  }

  async update(id: number, body: PatchEnrollmentsCoursesType): Promise<number> {
    return this.EnrollmentsExtensionRepository.update(id, body);
  }
}
