export type ExtensionCourseEntity = {
  id: number;
  programId: number;
  courseName: string;
  courseCode: string;
  description: string;
  durationHours: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

