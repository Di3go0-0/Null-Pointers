export class ProgramaInscrito {
    constructor(
        public id: number,
        public academicProgramId: number,
        public academicProgramName: string,
        public studentId: number,
        public studentName: string,
        public enrollmentDate: string,
        public status: string
    ) { }
}
