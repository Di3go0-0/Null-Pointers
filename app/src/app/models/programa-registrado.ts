export class ProgramaRegistrado {
    constructor(
        public id: number,
        public academicProgramId: number,
        public academicProgramName: string,
        public studentId: number,
        public studentName: string,
        public enrollmentDate: Date,
        public status: string
    ) { }

}

