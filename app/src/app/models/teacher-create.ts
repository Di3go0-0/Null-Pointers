export class TeacherCreate {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public confirmPassword: string,
        public contractTypeId: number,
        public specialty: string,
        public experience: string,
        public baseSalary: number
    ) { }
}
