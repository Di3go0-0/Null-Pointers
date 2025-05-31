export class MateriaInstanciada {
    constructor(
        public id: number,
        public courseId: number,
        public teacherId: number,
        public semester: string,
        public groupCode: string,
        public startDate: string,
        public endDate: string,
        public minStudents: number,
        public maxStudents: number,
        public status: string

    ) { }
}
