import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { GenerateTokenProps, TokenProps } from "../interfaces";

dotenv.config();

const key = process.env.SECRET_KEY as string;

export const generateToken = ({ id, mail, rol }: GenerateTokenProps) => {
  const token = jwt.sign({ id, mail, rol }, key, { expiresIn: "12h" });
  return token;
};

export const verifyToken = (cookie: string): Promise<TokenProps | null> => {
  return new Promise((resolve, reject) => {
    if (!cookie) {
      resolve(null);
    }
    try {
      const token = jwt.verify(cookie, key) as TokenProps;
      if (!token) {
        return resolve(null);
      }
      resolve(token);
    } catch {
      resolve(null);
    }
  });
};

export const getUserId = async (cookie: string): Promise<number | null> => {
  try {
    const tokenUser = await verifyToken(cookie);
    if (tokenUser && tokenUser.id) return tokenUser.id;
    return null;
  } catch {
    return null;
  }
};
