import { ScheduleEntity } from "../entities";
import { GetScheduleType, PatchScheduleType, PostScheduleType } from "../types";

export abstract class SchedulesExtensionInstancesRepository {
  abstract find(): Promise<ScheduleEntity[]>;
  abstract findSearch(params: GetScheduleType): Promise<ScheduleEntity[]>;
  abstract save(body: PostScheduleType): Promise<number>;
  abstract update(id: number, body: PatchScheduleType): Promise<number>;
  abstract verifyExtensionInstance(extensionCourseInstanceId: number): Promise<void>;
}
