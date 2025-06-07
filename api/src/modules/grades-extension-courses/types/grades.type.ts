export type GradesType = {
  id: number;
  extensionCourseEnrollmentId: number;
  studentId: number;
  extensionCourseInstanceId: number;
  term1_grade: number | null,
  term2_grade: number | null,
  term3_grade: number | null,
  final: number | null,
}
