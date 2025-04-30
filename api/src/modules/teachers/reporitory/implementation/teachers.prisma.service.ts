import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { TeachersRepository } from "../teachers.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { AddContractType } from "../../types";
import { TEACHERS } from "../../constans";
import { TeacherEntity } from "../../entities";
import { TeacherMapper } from "../../mappers/teacher.mapper";

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

  public async AddContractsType(id: number, body: AddContractType): Promise<number> {
    try {
      const existContractType = await this.existContractType(body.contractTypeId);
      if (!existContractType) {
        throw new HttpException(TEACHERS.ERROR.DONT_EXIST_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
      }

      const teachers = await this.prisma.teacher.update({
        where: {
          id
        },
        data: {
          contractTypeId: body.contractTypeId
        },
        select: {
          id: true
        }
      })

      return teachers.id

    } catch (error) {
      this.logger.error(`Error al crear tipo de contrato: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.ADD_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }

  }

  private async existContractType(contractId: number): Promise<boolean> {
    try {
      const contract = await this.prisma.contractType.findUnique({
        where: {
          id: contractId,
          active: true
        },
        select: {
          id: true
        }
      })
      return !!contract
    } catch (error) {
      this.logger.error(`Error al verificar existencia del tipo de contrato ${contractId}: ${error.message}`);
      throw new HttpException(TEACHERS.ERROR.DONT_EXIST_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }
}
