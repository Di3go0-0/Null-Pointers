export class CourseInstancia {
    constructor(
        public id: number,
        public extensionCourseId: number,
        public teacherId: number,
        public groupCode: string,
        public startDate: string,
        public endDate: string,
        public maxStudents: string,
        public publicationStatus: string
    ) { }
}
