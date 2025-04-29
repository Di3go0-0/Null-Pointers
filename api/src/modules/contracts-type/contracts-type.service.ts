import { Injectable } from '@nestjs/common';
import { ContractsTypeRepository } from './reporitory/contracts-type.repository';
import { CreateContractsTypesType, ContractTypesType, PatchContractsTypesType } from './types';

@Injectable()
export class ContractsTypeService {

  constructor(private readonly contractsTypeRepository: ContractsTypeRepository) { }

  async getContractsTypeById(id: number): Promise<ContractTypesType[]> {
    return this.contractsTypeRepository.getContractsTypeById(id);
  }

  async getAllContractsType(): Promise<ContractTypesType[]> {
    return this.contractsTypeRepository.getAllContractsType();
  }

  async postContractsType(body: CreateContractsTypesType): Promise<number> {
    return this.contractsTypeRepository.postContractsType(body);
  }

  async patchContractsType(id: number, body: PatchContractsTypesType): Promise<ContractTypesType> {
    return this.contractsTypeRepository.patchContractsType(id, body);
  }

  async deleteContractsType(id: number): Promise<number> {
    return this.contractsTypeRepository.deleteContractsType(id);
  }
}
