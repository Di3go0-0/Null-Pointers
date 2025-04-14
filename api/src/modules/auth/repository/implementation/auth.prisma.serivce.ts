import { Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterType } from "../../types";

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
}
