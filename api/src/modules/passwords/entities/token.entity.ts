export type TokenEntity = {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  active: boolean;
}
