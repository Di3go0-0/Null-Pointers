
export type GenerateTokenProps = {
  id: number;
  mail: string;
  rol: string;
}

export type TokenProps = {
  id: number;
  mail: string;
  rol: string;
  iat: number;
  exp: number;
}
