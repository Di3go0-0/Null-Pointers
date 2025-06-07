import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { StudentsRepository } from "../students.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { StudentEntity } from "../../entities";
import { STUDENTS } from "../../constans";
import { StudentMapper } from "../../mappers/student.mapper";
import { RoleName } from "@prisma/client";
import { RegisterType } from "src/modules/auth/types";
import { create } from "domain";
import { PatchStudentType } from "../../types/patch.student.type";

@Injectable()
export class StudentsPrismaService implements StudentsRepository {
  private readonly logger = new Logger(StudentsPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getStudentById(id: number, roleId: number): Promise<StudentEntity[]> {
    try {
      const student = await this.prisma.student.findMany({
        where: {
          id,
          user: {
            active: true,
            roleId
          }
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
            }
          }

        }
      })

      return StudentMapper.toDomainList(student);
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error finding student by id: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.GET_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async getStudents(roleId: number): Promise<StudentEntity[]> {
    try {
      const student = await this.prisma.student.findMany({
        where: {
          user: {
            active: true,
            roleId
          }
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
            }
          }

        }
      })

      return StudentMapper.toDomainList(student);
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error to find teacher by id: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.GET_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async postStudent(body: RegisterType): Promise<number> {
    const { name, email, password } = body;
    try {
      const roleId = await this.searchRole('STUDENT');

      const createdUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          roleId,
          student: {
            create: {},
          },
        },
        include: {
          student: true,
        },
      });

      return createdUser.id;
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error creating student: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.CREATE_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async searchRole(roleName: RoleName): Promise<number> {
    try {
      const role = await this.prisma.role.findFirst({
        where: { roleName: roleName, active: true }
      });

      if (!role) {
        throw new HttpException(STUDENTS.ERROR.CREATE_STUDENT, HttpStatus.NOT_FOUND);
      }

      return role.id;

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error al searching roleName: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.CREATE_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async existUser(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
          active: true
        },
        select: {
          id: true
        }
      })

      if (user) {
        throw new HttpException(STUDENTS.ERROR.USER_ALREADY_EXIT, HttpStatus.NOT_FOUND);
      }
      return !!user
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error searching user : ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.USER_ALREADY_EXIT, HttpStatus.BAD_REQUEST);
    }
  }


  public async patchStudent(id: number, body: PatchStudentType): Promise<number> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...body
        }
      })

      return user.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error searching user : ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.UPDATED_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }


  public async existStudent(id: number): Promise<boolean> {
    try {
      const user = await this.prisma.student.findUnique({
        where: { id }
      })

      if (user) {
        throw new HttpException(STUDENTS.ERROR.USER_ALREADY_EXIT, HttpStatus.NOT_FOUND);
      }

      return !!user
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error searching user : ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.STUDENT_DOESNT_EXIST, HttpStatus.BAD_REQUEST);
    }
  }

}


