import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { PatchPersonalInfoType, PersonalInfoType, PostPersonalInfoType, RegisterType, UserType } from "../../types";
import { AUTH_MESSAGES } from "../../constans";
import { RoleName } from "generated/prisma";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ChangePasswordWithOldType } from "../../types/change-password-with-old.type";
import { comparePassword } from "../../helpers";

@Injectable()
export class AuthPrismaSerivce implements AuthRepository {
  private readonly logger = new Logger(AuthPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async registerUser(body: RegisterType, roleId: number): Promise<number> {
    const { name, email, password } = body;

    try {
      const userExist = await this.prisma.user.findFirst({
        where: { email }
      });

      if (userExist) {
        this.logger.warn(`El usuario con email ${email} ya existe`);
        throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          roleId,
        },
      });

      this.logger.log(`Usuario registrado exitosamente: ${email}`);
      return user.id
    }
    catch (error) {
      this.logger.error(`Error al registrar Usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async existUser(email: string): Promise<UserType> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          active: true
        }
      });

      if (!user) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }

  }

  public async getUserRol(email: string): Promise<string> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          active: true
        }
      });

      if (!user || !user.roleId) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      const rol = await this.prisma.role.findFirst({
        where: { id: user.roleId, active: true }
      })

      if (!rol) {
        throw new HttpException(AUTH_MESSAGES.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return rol.roleName;

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async searchRole(roleName: RoleName): Promise<number> {
    try {
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName, active: true }
      });

      if (!role) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }
      return role.id;

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPersonalInfo(userId: number): Promise<PersonalInfoType[]> {
    try {
      const personalInfo = await this.prisma.personalInfo.findMany({
        where: {
          id: userId,
          user: {
            active: true
          }
        }
      })

      if (!personalInfo) {
        throw new HttpException(AUTH_MESSAGES.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      return personalInfo
    }
    catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number> {
    const { identificationNumber, birthdate, address, phoneNumber } = body
    try {
      const personalInfo = await this.prisma.personalInfo.create({
        data: {
          id: userId,
          identificationNumber,
          address,
          birthdate,
          phoneNumber,
        }
      })
      return personalInfo.id
    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }

  }

  public async patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number> {
    try {
      const updated = await this.prisma.personalInfo.update({
        where: { id: userId },
        data: { ...body }
      })

      return updated.id
    }
    catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async chagePasswordWithOld(userId: number, body: ChangePasswordWithOldType): Promise<number> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          active: true,
        }
      })

      if (!user) throw new HttpException(AUTH_MESSAGES.ERROR.NOT_FOUND, HttpStatus.BAD_REQUEST);
      console.log(user.password)

      const match = await comparePassword(body.oldPassword, user.password)
      console.log(match)

      if (!match) {
        throw new HttpException(AUTH_MESSAGES.ERROR.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST);
      }

      await this.prisma.passwordHistory.create({
        data: {
          userId,
          passwordHash: user.password
        }
      })

      const userUpdated = await this.prisma.user.update({
        where: {
          id: userId,
          active: true,
        },
        data: {
          password: body.password,
        }
      })

      return userUpdated.id
    }
    catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.CHANGE_PASSWORD, HttpStatus.BAD_REQUEST);
    }
  }
}
