import { $Enums } from "@prisma/client";

export type GetByStatusCoursesInstancesType = {
  id?: number,
  teacherId?: number;
  extensionCourseId?: number;
  publicationStatus?: $Enums.ExtensionPublicationStatus;
}
