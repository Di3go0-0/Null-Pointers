import { PrismaClient } from "@prisma/client";
import { getUserId } from "../helpers";
import bcrypt from "bcrypt";
import type { IUser } from "../interfaces";

const prisma = new PrismaClient();


interface RegisterProps {
  mail: string;
  name: string;
  password: string;
  rol: "admin" | "teacher" | "student";
}
export const registerRepo = async ({ mail, name, password, rol }: RegisterProps): Promise<IUser | null> => {
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { mail, name, password: passwordHash, rol },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtainRolUserRepo = async (mail: string): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });
    if (!user) return null;
    return user.rol;
  } catch {
    return null;
  }
}

export const obtainUserRepo = async (mail: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
};

export const obatainUsersRepo = async (): Promise<IUser[] | null> => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return null;
    return users;
  } catch {
    return null;
  }
}

export const obtainUserByIdRepo = async (id: number): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id }
    })
    if (!user) return null;
    return user;
  } catch (e) {
    return null;
  }
}
