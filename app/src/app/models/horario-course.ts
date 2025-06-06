export class HorarioCourse {
    constructor(
        public id: number,
        public extensionCourseInstanceId: number,
        public day: string,
        public startTime: number,
        public endTime: number,
        public classroom: string
    ) { }
}
