export class EnrollmentCourseEx {
    constructor(
        public id: number,
        public status: string,
        public studentId: number,
        public extensionCourseInstanceId: number,
        public enrollmentDate: Date,
        public semester: string
    ) { }
}

