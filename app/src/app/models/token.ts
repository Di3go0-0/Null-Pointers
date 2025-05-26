export class Token {
    constructor(
        public id: number,
        public email: string,
        public iat: number,
        public exp: number
    ) { }
}
