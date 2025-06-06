export class CourseInstancia {
    constructor(
        public id: number,
        public extensionCourseId: number,
        public teacherId: number,
        public groupCode: string,
        public startDate: Date,
        public endDate: Date,
        public maxStudents: string,
        public publicationStatus: string
    ) { }
}
