export type GenerateTokenProps = {
  id: number;
  email: string;
}

export type TokenProps = {
  id: number;
  email: string;
  rol: string;
  iat: number;
  exp: number;
}
