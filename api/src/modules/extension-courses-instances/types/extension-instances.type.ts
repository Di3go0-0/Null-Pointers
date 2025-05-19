import { $Enums } from "@prisma/client";

export type ExtesionInstanceType = {
  id: number;
  extensionCourseId: number;
  teacherId: number;
  groupCode: string;
  startDate: Date;
  endDate: Date;
  maxStudents: number;
  publicationStatus: $Enums.ExtensionPublicationStatus;
}
