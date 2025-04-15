import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterType } from "../../types";
import { AUTH_MESSAGES } from "../../constans";

@Injectable()
export class AuthPrismaSerivce implements AuthRepository {
  private readonly logger = new Logger(AuthPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async registerRequest(body: RegisterType): Promise<boolean> {
    try {
      const { name, email, password, identificationNumber } = body;

      // Buscar el rol de STUDENT o crearlo si no existe
      const studentRole = await this.prisma.role.findFirst({
        where: { name: 'STUDENT' }
      });

      const roleId = studentRole ? studentRole.id :
        (await this.prisma.role.create({
          data: { name: 'STUDENT' }
        })).id;

      await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          identificationNumber: String(identificationNumber),
          roleId,
          additionalPersonalInfo: '', // Campo requerido según el esquema
        },
      });

      this.logger.log(`Usuario registrado exitosamente: ${email}`);
      return true;
    }
    catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      return false;
    }
  }

  public async existUser(email: string): Promise<number> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email }
      });

      if (!user) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }


      return user.id;

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }

  }

  public async getUserRol(email: string): Promise<string> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email }
      });

      if (!user) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      const rol = await this.prisma.role.findFirst({
        where: { id: user.roleId }
      })

      if (!rol) {
        throw new HttpException(AUTH_MESSAGES.ERROR.NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      return rol.name

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }

  }

}
