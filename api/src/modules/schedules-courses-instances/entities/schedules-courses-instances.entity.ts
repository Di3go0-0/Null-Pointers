import { $Enums } from "@prisma/client";

export type ScheduleEntity = {
  id: number;
  courseInstanceId: number;
  day: $Enums.DayOfWeek;
  startTime: number;
  endTime: number;
  classroom: string;
}
