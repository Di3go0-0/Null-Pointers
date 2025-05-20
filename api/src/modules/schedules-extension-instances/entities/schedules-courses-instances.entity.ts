import { $Enums } from "@prisma/client";

export type ScheduleEntity = {
  id: number;
  extensionCourseInstanceId: number;
  day: $Enums.DayOfWeek;
  startTime: number;
  endTime: number;
  classroom: string;
}
