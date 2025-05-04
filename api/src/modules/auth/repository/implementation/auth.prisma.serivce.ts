import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { RegisterType } from "../../types";
import { AUTH_MESSAGES } from "../../constans";
import { RoleName } from "generated/prisma";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { UserEntity } from "../../entities";

@Injectable()
export class AuthPrismaSerivce implements AuthRepository {
  private readonly logger = new Logger(AuthPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async registerUser(body: RegisterType): Promise<number> {
    const { name, email, password } = body;
    try {
      const roleId = await this.searchRole('STUDENT')
      await this.userNew(body.email)

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          roleId,
        },
      });

      return user.id
    }
    catch (error) {
      this.logger.error(`Error Creating User: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.REGISTER_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
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
      this.logger.error(`Error searching user: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }

  }

  private async searchRole(roleName: RoleName): Promise<number> {
    try {
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName, active: true }
      });

      if (!role) {
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_NOT_FOUNT, HttpStatus.NOT_FOUND);
      }
      return role.id;

    } catch (error) {
      this.logger.error(`Error searching role ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.PRISMA_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  private async userNew(email: string): Promise<void> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email }
      });

      if (user) {
        this.logger.error('Error user alrady exist');
        throw new HttpException(AUTH_MESSAGES.ERROR.USER_EXIST, HttpStatus.LOCKED);
      }

    } catch (error) {
      this.logger.error(`Error user alrady exist: ${error.message}`);
      throw new HttpException(AUTH_MESSAGES.ERROR.USER_EXIST, HttpStatus.BAD_REQUEST);
    }
  }
}
