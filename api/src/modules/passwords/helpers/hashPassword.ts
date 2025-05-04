import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PASSWORDS_MESSAGES } from '../constans';

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const logger = new Logger('ComparePassword');
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;

  } catch (error) {
    logger.error(`Error durante la comparación de contraseñas: ${error.message}`);
    throw new HttpException(
      PASSWORDS_MESSAGES.ERROR.PASSWORD_NOT_MATCH,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
