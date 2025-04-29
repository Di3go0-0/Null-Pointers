import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ContractsTypeRepository } from "../contracts-type.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateContractsTypesType, ContractTypesType, PatchContractsTypesType } from "../../types";
import { CONTRACTS_TYPE } from "../../constans";

@Injectable()
export class ContractsTypePrismaService implements ContractsTypeRepository {
  private readonly logger = new Logger(ContractsTypePrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getContractsTypeById(id: number): Promise<ContractTypesType[]> {
    try {
      const contract = await this.prisma.contractType.findMany({
        where: {
          id,
          active: true
        },
        select: {
          id: true,
          typeName: true,
          description: true,
          allowsExtensionCourse: true,
          affectsSalary: true
        }

      })

      return contract;
    }
    catch (error) {
      this.logger.error(`Error al obtener tipo de contrato: ${error.message}`);
      throw new HttpException(CONTRACTS_TYPE.ERROR.GET_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllContractsType(): Promise<ContractTypesType[]> {
    try {
      const contracts = await this.prisma.contractType.findMany({
        where: {
          active: true
        },
        select: {
          id: true,
          typeName: true,
          description: true,
          allowsExtensionCourse: true,
          affectsSalary: true
        }

      })

      return contracts
    }
    catch (error) {
      this.logger.error(`Error al obtener tipo de contrato: ${error.message}`);
      throw new HttpException(CONTRACTS_TYPE.ERROR.GET_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }

  public async postContractsType(body: CreateContractsTypesType): Promise<number> {
    const { typeName, description, allowsExtensionCourse, affectsSalary } = body

    try {
      const contractstype = await this.prisma.contractType.create({
        data: {
          typeName,
          description,
          allowsExtensionCourse,
          affectsSalary,
        }
      })

      return contractstype.id;
    }
    catch (error) {
      this.logger.error(`Error al crear tipo de contrato: ${error.message}`);
      throw new HttpException(CONTRACTS_TYPE.ERROR.CREATE_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }

  public async patchContractsType(id: number, body: PatchContractsTypesType): Promise<ContractTypesType> {
    const { typeName, description, allowsExtensionCourse, affectsSalary } = body

    try {
      const updatedContractstype = await this.prisma.contractType.update({
        where: {
          id
        },
        data: {
          typeName,
          description,
          allowsExtensionCourse,
          affectsSalary,
        },
        select: {
          id: true,
          typeName: true,
          description: true,
          allowsExtensionCourse: true,
          affectsSalary: true
        }

      })

      return updatedContractstype;
    }
    catch (error) {
      this.logger.error(`Error al crear tipo de contrato: ${error.message}`);
      throw new HttpException(CONTRACTS_TYPE.ERROR.UPDATE_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteContractsType(id: number): Promise<number> {

    try {
      const deletedContractstype = await this.prisma.contractType.update({
        where: {
          id
        },
        data: {
          active: false
        },
        select: {
          id: true,
        }

      })

      return deletedContractstype.id;
    }
    catch (error) {
      this.logger.error(`Error al crear tipo de contrato: ${error.message}`);
      throw new HttpException(CONTRACTS_TYPE.ERROR.DELETE_CONTRACT_TYPE, HttpStatus.BAD_REQUEST);
    }
  }
}
