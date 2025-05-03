import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { TeachersRepository } from "../teachers.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PatchTeacherType, PostTeacherType } from "../../types";
import { TEACHERS } from "../../constans";
import { TeacherEntity } from "../../entities";
import { TeacherMapper } from "../../mappers/teacher.mapper";
import { RoleName } from "generated/prisma";

@Injectable()
export class TeachersPrismaService implements TeachersRepository {
  private readonly logger = new Logger(TeachersPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getTeachers(): Promise<TeacherEntity[]> {
    try {
      const teachersData = await this.prisma.teacher.findMany({
        select: {
          id: true,
          specialty: true,
          experience: true,
          baseSalary: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          contractType: {
            select: {
              id: true,
              typeName: true,
              allowsExtensionCourse: true,
              affectsSalary: true,
            },
          },
        },
        where: {
          user: {
            active: true,
          },
        },
      });

      return TeacherMapper.toDomainList(teachersData);
    }
    catch (error) {
      this.logger.error(`Error al crear tipo de contrato: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.GET_TEACHER, HttpStatus.BAD_REQUEST);
    }

  }

  public async postTeacher(userId: number, body: PostTeacherType): Promise<number> {
    try {
      const roleId = await this.searchRole('TEACHER');
      await this.existUser(userId)

      const updatedRol = await this.updateUserRol(userId, roleId);

      if (!updatedRol) {
        throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
      }

      const createdTeacher = await this.prisma.teacher.create({
        data: {
          id: userId,
          ...body
        },
        include:
        {
          user: true
        }
      })

      if (!createdTeacher) {
        throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`Teacher registered successfully: ${createdTeacher.user.email}`);
      return createdTeacher.id;
    }
    catch (error) {
      this.logger.error(`Error registering teacher: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    try {
      await this.existUser(userId);

      const updatedTeacher = await this.prisma.teacher.update({
        where: {
          id: userId,
        },
        data: {
          ...body
        }
      })

      if (!updatedTeacher) {
        throw new HttpException(TEACHERS.ERROR.UPDATED_TEACHER, HttpStatus.BAD_REQUEST);
      }

      return updatedTeacher.id
    }
    catch (error) {
      this.logger.error(`Error updating the teacher: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.UPDATED_TEACHER, HttpStatus.BAD_REQUEST);
    }

  }

  private async searchRole(roleName: RoleName): Promise<number> {
    try {
      // Buscar el rol de STUDENT o crearlo si no existe
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName, active: true }
      });

      if (!role) {
        throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.NOT_FOUND);
      }

      return role.id;

    } catch (error) {
      this.logger.error(`Error al registrar usuario: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  private async existUser(userId: number): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
          active: true
        },
        select: {
          id: true
        }
      })
      if (!user) {
        throw new HttpException(TEACHERS.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      return !!user
    } catch (error) {
      this.logger.error(`Error al verificar existencia del usuario ${userId}: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  private async updateUserRol(userId: number, rolId: number): Promise<boolean> {
    try {
      const updatedRol = await this.prisma.user.update({
        where: {
          id: userId,
          active: true
        },
        data: {
          roleId: rolId
        },
      })

      if (!updatedRol) {
        throw new HttpException(TEACHERS.ERROR.UPDATED_ROL, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      this.logger.error(`Error al verificar existencia del usuario ${userId}: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.UPDATED_ROL, HttpStatus.BAD_REQUEST);
    }

  }
}
