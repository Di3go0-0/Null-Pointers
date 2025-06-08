import { ScheduleEntity } from "../entities";
import { GetScheduleType, partialSchedules, PatchScheduleType, PostScheduleType } from "../types";



export abstract class SchedulesCoursesInstancesRepository {
  abstract find(): Promise<ScheduleEntity[]>;
  abstract findSearch(params: GetScheduleType): Promise<ScheduleEntity[]>;
  abstract save(body: PostScheduleType): Promise<number>;
  abstract update(id: number, body: PatchScheduleType): Promise<number>;
  abstract schedulesCrossing(props: partialSchedules): Promise<void>;
  abstract courseInstanceId(scheuleId: number): Promise<number>;
  abstract delete(id: number): Promise<number>;
}
