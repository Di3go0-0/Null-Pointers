import { CreateContractsTypesType, ContractTypesType, PatchContractsTypesType } from "../types";

export abstract class ContractsTypeRepository {
  abstract getContractsTypeById(id: number): Promise<ContractTypesType[]>;
  abstract getAllContractsType(): Promise<ContractTypesType[]>;
  abstract postContractsType(body: CreateContractsTypesType): Promise<number>;
  abstract patchContractsType(id: number, body: PatchContractsTypesType): Promise<ContractTypesType>;
  abstract deleteContractsType(id: number): Promise<number>;
}
