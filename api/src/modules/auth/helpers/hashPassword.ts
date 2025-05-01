import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AUTH_MESSAGES } from '../constans';

export const hashpassword = async (password: string): Promise<string> => {
  // Hash de la contraseña
  const logger = new Logger('HashPassword');
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;

  } catch (error) {
    logger.error(error.message);
    throw new HttpException(AUTH_MESSAGES.ERROR.HASED_PASSWORD, HttpStatus.BAD_REQUEST);
  }
}
