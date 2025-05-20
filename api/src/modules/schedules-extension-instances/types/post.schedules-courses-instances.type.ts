import { DayOfWeek } from "@prisma/client";

export type PostScheduleType = {
  extensionCourseInstanceId: number;
  day: DayOfWeek;
  startTime: number;
  endTime: number;
  classroom: string;
}
