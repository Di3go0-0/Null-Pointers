export class EnrollmentCourse {
    constructor(
        public id: number,
        public status: string,
        public studentId: number,
        public courseInstanceId: number,
        public enrollmentDate: Date,
        public semester: string
    ) { }
}
