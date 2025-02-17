import type { Request, Response } from "express";
import { generateToken, verifyToken } from "../helpers";
import { obatainUsersRepo, obtainUserRepo, registerRepo } from "../repository";
import { verifyPassword } from "../services";
import { Role } from "@prisma/client";

interface User {
  id: number;
  mail: string;
  name: string;
  rol: Role;
}

export const register = async (req: Request, res: Response) => {
  const { mail, name, password, rol } = req.body;
  try {
    const userExist = await obtainUserRepo(mail);
    if (userExist) {
      res.status(400).json({ message: "User already exists", mail: "mail already exists" });
    }
    const user = await registerRepo({ mail, name, password, rol });
    if (!user) {
      res.status(400).json({ message: "Error creating user" });
      return;
    }

    const userCreated: User = { id: user.id, mail: user.mail, name: user.name as string, rol: user.rol };
    res.status(201).json({ data: userCreated, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { mail, password } = req.body;
  try {
    const user = await obtainUserRepo(mail);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        mail: "Invalid mail",
      });
      return;
    }

    const userPassword = user.password as string;

    const passwordMatch = await verifyPassword({ password, userPassword });

    if (!passwordMatch) {
      res.status(400).json({
        message: "Invalid credentials",
        password: "Incorrect password",
      });
      return;
    }

    const userLogged: User = { id: user.id, mail: user.mail, name: user.name as string, rol: user.rol };


    const token = generateToken({ id: user.id, mail: user.mail, rol: user.rol });

    res.cookie("token", token, {
      // httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({ data: userLogged, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    res.status(400).json({ message: "No token found" });
  }
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const validateUser = async (req: Request, res: Response,): Promise<void> => {
  const cookie = req.cookies.token as string;
  if (!cookie) {
    res.status(400).json({ message: "No token found" });
    return;
  }

  try {
    const token = await verifyToken(cookie);
    if (!token || !token.mail) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const user = await obtainUserRepo(token.mail);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const data = { id: user.id, mail: user.mail, name: user.name };
    res.status(200).json({ message: "Validation successful", data: data });
  } catch (error) {
    res.status(500).json({ message: "Error validating user" });
  }
};


export const users = async (req: Request, res: Response) => {
  try {
    const users = await obatainUsersRepo();
    if (!users) res.status(404).json({ message: "Users not found" });

    res.status(200).json({ data: users, message: "Users retrieved successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error getting users" });
  }

}
