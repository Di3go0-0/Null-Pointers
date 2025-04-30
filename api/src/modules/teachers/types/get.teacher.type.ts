export type Teacher = {
  id: number;
  name: string;
  email: string;
  contract: {
    id: number;
    typeName: string;
    allowsExtensionCourse: boolean;
    affectsSalary: boolean;
  };
  specialty: string;
  experience: string;
  baseSalary: number;
}
