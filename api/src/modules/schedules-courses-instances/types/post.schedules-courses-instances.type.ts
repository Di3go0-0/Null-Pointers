import { DayOfWeek } from "@prisma/client";

export type PostScheduleType = {
  courseInstanceId: number;
  day: DayOfWeek;
  startTime: number;
  endTime: number;
  classroom: string;
}
