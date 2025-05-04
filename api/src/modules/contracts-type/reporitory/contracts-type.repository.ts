import { ContractTypesEntity } from "../entities";
import { CreateContractsTypesType, PatchContractsTypesType } from "../types";

export abstract class ContractsTypeRepository {
  abstract getContractsTypeById(id: number): Promise<ContractTypesEntity>;
  abstract getAllContractsType(): Promise<ContractTypesEntity[]>;
  abstract postContractsType(body: CreateContractsTypesType): Promise<number>;
  abstract patchContractsType(id: number, body: PatchContractsTypesType): Promise<number>;
  abstract deleteContractsType(id: number): Promise<number>;
}
