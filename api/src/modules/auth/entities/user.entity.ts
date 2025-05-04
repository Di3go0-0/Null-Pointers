export type UserEntity = {
  id: number;
  roleId: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
