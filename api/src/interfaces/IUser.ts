export interface IUser {
  id: number;
  mail: string;
  name: string | null;
  password: string;
  rol: "admin" | "teacher" | "student";
  createdAt: Date;
  updatedAt: Date;
}

