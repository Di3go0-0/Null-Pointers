export interface GenerateTokenProps {
  id: number;
  mail: string;
  rol: "admin" | "teacher" | "student";
}

export interface TokenProps {
  id: number;
  mail: string;
}
