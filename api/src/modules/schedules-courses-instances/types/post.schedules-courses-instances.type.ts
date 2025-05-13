import { DayOfWeek } from "@prisma/client";

export type PostScheduleType = {
  courseInstanceId: number;
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
  classroom: string;
}
