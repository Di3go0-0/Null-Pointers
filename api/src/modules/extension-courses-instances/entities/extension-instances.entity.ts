import { $Enums } from "@prisma/client";

export type ExtensionInstanceEntity = {
  id: number;
  extensionCourseId: number;
  teacherId: number;
  groupCode: string;
  startDate: Date;
  endDate: Date;
  maxStudents: number;
  publicationStatus: $Enums.ExtensionPublicationStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

