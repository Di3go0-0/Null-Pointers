export class MateriaCreate {
    constructor(
        public programId: number,
        public courseName: string,
        public courseCode: string,
        public description: string,
        public credits: number
    ) { }
}
