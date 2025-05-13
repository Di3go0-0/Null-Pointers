import { $Enums } from "@prisma/client";

export type ScheduleEntity = {
  id: number;
  courseInstanceId: number;
  day: $Enums.DayOfWeek;
  startTime: Date;
  endTime: Date;
  classroom: string;
}
