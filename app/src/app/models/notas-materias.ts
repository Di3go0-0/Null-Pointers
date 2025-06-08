export class NotasMaterias {
    constructor(
        public id: number,
        public enrollmentCourseId: number,
        public studentId: number,
        public courseInstanceId: number,
        public term1_grade: string | null,
        public term2_grade: string | null,
        public term3_grade: string | null,
        public final: string | null
    ){}
}
