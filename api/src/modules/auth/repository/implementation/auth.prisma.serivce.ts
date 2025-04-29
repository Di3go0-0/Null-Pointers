import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { RegisterType } from "../../types";
import { AUTH_MESSAGES } from "../../constans";
import { RoleName } from "generated/prisma";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class AuthPrismaSerivce implements AuthRepository {
  private readonly logger = new Logger(AuthPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async registerStudentRequest(body: RegisterType): Promise<number> {
    try {
      const roleId = await this.searchRole('STUDENT');
      const registered = await this.registerUser(body, roleId);

      if (!registered) {
        throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`Estudiante registrado exitosamente: ${body.email}`);
      return registered;
    }
    catch (error) {
      this.logger.error(`Error al registrar Estudiante: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async registerTeacherRequest(body: RegisterType): Promise<number> {
    try {
      const roleId = await this.searchRole('TEACHER');
      const registered = await this.registerUser(body, roleId);

      if (!registered) {
        throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`Teacher registered successfully: ${body.email}`);
      return registered;
    }
    catch (error) {
      this.logger.error(`Error al registrar Estudiante: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
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

      if (!user || !user.roleId) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      const rol = await this.prisma.role.findFirst({
        where: { id: user.roleId }
      })

      if (!rol) {
        throw new HttpException(AUTH_MESSAGES.ERROR.NOT_FOUNT, HttpStatus.NOT_FOUND);
      }

      return rol.roleName;

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  private async registerUser(body: RegisterType, roleId: number): Promise<number> {
    const { name, email, password } = body;

    // Verificar si el usuario existe sin lanzar excepción
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
          // identificationNumber: String(identificationNumber),
          roleId,
          // additionalPersonalInfo: '', // Campo requerido según el esquema
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

  private async searchRole(roleName: RoleName): Promise<number> {
    try {
      // Buscar el rol de STUDENT o crearlo si no existe
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName }
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

}
