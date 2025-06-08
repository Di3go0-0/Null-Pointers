export class NotasCursos {
     constructor(
        public id: number,
        public extensionCourseEnrollmentId: number,
        public studentId: number,
        public extensionCourseInstanceId: number,
        public term1_grade: string | null,
        public term2_grade: string | null,
        public term3_grade: string | null,
        public final: string | null
    ){}
}
