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
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const logger = new Logger('ComparePassword');
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;

  } catch (error) {
    logger.error(`Error durante la comparación de contraseñas: ${error.message}`);
    throw new HttpException(
      AUTH_MESSAGES.ERROR.PASSWORD_NOT_MATCH,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
