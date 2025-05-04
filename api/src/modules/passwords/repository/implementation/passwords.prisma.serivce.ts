import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PasswordsRepository } from "../passwords.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PASSWORDS_MESSAGES } from "../../constans";
import { comparePassword } from "../../helpers";
import { TokenEntity, UserEntity } from "../../entities";

@Injectable()
export class PasswordsPrismaSerivce implements PasswordsRepository {
  private readonly logger = new Logger(PasswordsPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async userExist(email: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          active: true,
        }
      })

      if (!user) {
        this.logger.debug('Error user Not found');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      return user
    }
    catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.BAD_REQUEST);
    }
  }

  public async createToken(userId: number, token: string, expiresAt: Date): Promise<TokenEntity> {
    try {
      const tokenCreated = await this.prisma.passwordResetToken.create({
        data: {
          userId,
          token,
          expiresAt
        }
      })

      if (!tokenCreated) {
        this.logger.debug('Error creating token');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.REQUEST_TOKEN, HttpStatus.FORBIDDEN);
      }

      return tokenCreated
    }
    catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.REQUEST_TOKEN, HttpStatus.BAD_REQUEST);
    }
  }

  public async passwordMatch(oldPassword: string, newPassword: string): Promise<void> {
    try {
      const match = await comparePassword(oldPassword, newPassword)

      if (!match) {
        this.logger.debug('Passwords dont match');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.PASSWORD_NOT_MATCH, HttpStatus.LOCKED);
      }
    }
    catch (error) {
      this.logger.error(`Error matching passwords: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }

  }

  public async changePassword(userId: number, password: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
          active: true,
        },
        data: {
          password
        }
      })

      if (!user) {
        this.logger.debug('Error changing password');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.CHANGE_PASSWORD, HttpStatus.FORBIDDEN);
      }

      return user
    }
    catch (error) {
      this.logger.error(`Error changing password: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.CHANGE_PASSWORD, HttpStatus.BAD_REQUEST);
    }

  }

  public async tokenExist(token: string, userId: number): Promise<TokenEntity> {
    try {
      const tokenFind = await this.prisma.passwordResetToken.findFirst({
        where: {
          token,
          userId,
          user: {
            active: true
          },
          active: true
        }
      })

      if (!tokenFind) {
        this.logger.debug('Error token Not found');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      if (tokenFind.expiresAt.getTime() < Date.now()) {
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.REQUEST_TOKEN_EXPIRED, HttpStatus.LOCKED);
      }

      return tokenFind
    }
    catch (error) {
      this.logger.error(`Error finding token: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  public async createPasswordHistory(userId: number, password: string): Promise<void> {
    try {
      const passwordHistory = this.prisma.passwordHistory.create({
        data: {
          userId,
          passwordHash: password
        }
      })

      if (!passwordHistory) {
        this.logger.debug('Error creating password history');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.CHANGE_PASSWORD, HttpStatus.FORBIDDEN);
      }
    }

    catch (error) {
      this.logger.error(`Error creating password history: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.CHANGE_PASSWORD, HttpStatus.BAD_REQUEST);
    }

  }

  public async useToken(token: string): Promise<void> {
    try {
      const tokenUpdated = await this.prisma.passwordResetToken.update({
        where: { token: token },
        data: { active: false },
      })

      if (!tokenUpdated) {
        this.logger.debug('Error marking token as used');
        throw new HttpException(PASSWORDS_MESSAGES.ERROR.MARKING_TOKEN, HttpStatus.BAD_REQUEST);
      }
    }
    catch (error) {
      this.logger.error(`Error marking token as used: ${error.message}`);
      throw new HttpException(PASSWORDS_MESSAGES.ERROR.MARKING_TOKEN, HttpStatus.BAD_REQUEST);
    }

  }

}
