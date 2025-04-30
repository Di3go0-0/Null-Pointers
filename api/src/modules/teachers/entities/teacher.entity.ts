export type TeacherEntity = {
  id: number;
  name: string;
  email: string;
  contract: {
    id: number;
    typeName: string;
    allowsExtensionCourse: boolean;
    affectsSalary: boolean;
  } | null;
  specialty: string | null;
  experience: string | null;
  baseSalary: number | null;
}
