export class HorarioMateria {
    constructor(
        public id: number,
        public courseInstanceId: number,
        public day: string,
        public startTime: number,
        public endTime: number,
        public classroom: string
    ) { }
}
