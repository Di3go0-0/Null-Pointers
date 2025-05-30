export class MateriaInstanciada {
    constructor(
        public courseId: number,
        public teacherId: number,
        public semester: string,
        public groupCode: string,
        public startDate: Date,
        public endDate: Date,
        public minStudents: number,
        public maxStudents: number,
        public status: string

    ) { }
}
