import { randomBytes } from 'crypto';

export const generateResetToken = (): string => {
  return randomBytes(8).toString('hex');
}
