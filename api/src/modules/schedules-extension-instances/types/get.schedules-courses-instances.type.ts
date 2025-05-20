import { PostScheduleType } from "./post.schedules-courses-instances.type";

export type GetScheduleType = Partial<PostScheduleType> & {
  id?: number;
}
