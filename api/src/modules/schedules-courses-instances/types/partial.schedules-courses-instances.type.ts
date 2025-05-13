import { ScheduleEntity } from "../entities";

export type partialSchedules = Omit<ScheduleEntity, 'id' | 'courseInstanceId'> & {
  courseInstanceId: number
};
