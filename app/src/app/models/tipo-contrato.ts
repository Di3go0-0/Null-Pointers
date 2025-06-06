export class TipoContrato {
    constructor(
        public id: number,
        public typeName: string,
        public description: string,
        public allowsExtensionCourse: boolean,
        public affectsSalary: boolean
    ) { }
}
