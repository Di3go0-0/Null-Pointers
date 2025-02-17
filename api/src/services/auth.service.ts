import bcrypt from "bcrypt";

interface verifyPasswordProps {
  password: string;
  userPassword: string;
}

export const verifyPassword = async ({ password, userPassword, }: verifyPasswordProps): Promise<boolean> => {
  try {
    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch) return false;
    return true;
  } catch {
    return false;
  }
};
