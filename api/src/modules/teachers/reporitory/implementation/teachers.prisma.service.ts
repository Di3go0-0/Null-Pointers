import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { TeachersRepository } from "../teachers.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PatchTeacherType, BaseTeacherType, PostTeacherType } from "../../types";
import { TEACHERS } from "../../constans";
import { TeacherEntity } from "../../entities";
import { TeacherMapper } from "../../mappers/teacher.mapper";
import { RoleName } from "@prisma/client";
import { RegisterType } from "src/modules/auth/types";

@Injectable()
export class TeachersPrismaService implements TeachersRepository {
  private readonly logger = new Logger(TeachersPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getTeacherById(id: number, roleId: number): Promise<TeacherEntity[]> {
    try {
      const teacherData = await this.prisma.teacher.findMany({
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
            id,
            active: true,
            roleId
          },
        },
      });

      return TeacherMapper.toDomainList(teacherData);
    } catch (error) {
      this.logger.error(`Error to find teacher by id: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.GET_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async getTeachers(roleId: number): Promise<TeacherEntity[]> {
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
            roleId
          },
        },
      });

      return TeacherMapper.toDomainList(teachersData);
    } catch (error) {
      this.logger.error(`Error finding teachers: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.GET_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveTeacher(user: PostTeacherType): Promise<number> {
    const { name, email, password, ...teacher } = user;
    try {
      const roleId = await this.searchRole('TEACHER')

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          roleId,
          teacher: {
            create: {
              ...teacher
            }
          }
        },
      });

      return user.id
    }
    catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error registering teacher: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    try {
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

  public async searchRole(roleName: RoleName): Promise<number> {
    try {
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName, active: true }
      });

      if (!role) {
        throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.NOT_FOUND);
      }

      return role.id;

    } catch (error) {
      this.logger.error(`Error searching role: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.CREATE_TEACHER, HttpStatus.BAD_REQUEST);
    }
  }

  public async existTeacher(userId: number): Promise<boolean> {
    try {
      const user = await this.prisma.teacher.findUnique({
        where: {
          id: userId,
          user: {
            active: true
          }
        },
        select: {
          id: true
        }
      })
      if (user) {
        throw new HttpException(TEACHERS.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      return !!user
    } catch (error) {
      this.logger.error(`Error searching teacher ${userId}: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  public async userNew(email: string): Promise<void> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email }
      });

      if (user) {
        throw new HttpException(TEACHERS.ERROR.USER_ALREADY_EXIST, HttpStatus.LOCKED);
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error user alrady exist: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.USER_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }
  }
}
