import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { StudentsRepository } from "../students.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { StudentEntity } from "../../entities";
import { STUDENTS } from "../../constans";
import { StudentMapper } from "../../mappers/student.mapper";
import { RoleName } from "generated/prisma";

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
      this.logger.error(`Error to find teacher by id: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.GET_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async postStudent(userId: number): Promise<number> {
    try {
      const student = await this.prisma.student.create({
        data: {
          id: userId,
        }
      })

      if (!student) {
        throw new HttpException(STUDENTS.ERROR.CREATE_STUDENT, HttpStatus.BAD_REQUEST);
      }

      return student.id
    }
    catch (error) {
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
      this.logger.error(`Error al searching roleName: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.CREATE_STUDENT, HttpStatus.BAD_REQUEST);
    }
  }

  public async existUser(userId: number): Promise<boolean> {
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
        throw new HttpException(STUDENTS.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      return !!user
    } catch (error) {
      this.logger.error(`Error searching user  ${userId}: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserRol(userId: number, rolId: number): Promise<boolean> {
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
        throw new HttpException(STUDENTS.ERROR.UPDATED_ROL, HttpStatus.BAD_REQUEST);
      }

      return true
    } catch (error) {
      this.logger.error(`Error updating user rol ${userId}: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.UPDATED_ROL, HttpStatus.BAD_REQUEST);
    }
  }

  public async existStudent(userId: number): Promise<boolean> {
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
        throw new HttpException(STUDENTS.ERROR.STUDENT_ALREADY_EXIST, HttpStatus.CONFLICT);
      }

      return !!user
    } catch (error) {
      this.logger.error(`Error searching teacher ${userId}: ${error.message}`);
      throw new HttpException(STUDENTS.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }
}


