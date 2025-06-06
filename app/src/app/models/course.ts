export class Course {
    constructor(
        public id: number,
        public programId: number,
        public courseName: string,
        public courseCode: string,
        public description: string,
        public durationHours: number
    ){}
}
