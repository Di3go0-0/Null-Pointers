export type GradesType = {
  id: number;
  enrollmentCourseId: number;
  studentId: number;
  courseInstanceId: number;
  semester: string;
  term1_grade: number | null,
  term2_grade: number | null,
  term3_grade: number | null,
  final: number | null,
}
