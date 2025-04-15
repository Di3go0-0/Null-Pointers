
export type GenerateTokenProps = {
  id: number;
  email: string;
  rol: string;
}

export type TokenProps = {
  id: number;
  email: string;
  rol: string;
  iat: number;
  exp: number;
}
