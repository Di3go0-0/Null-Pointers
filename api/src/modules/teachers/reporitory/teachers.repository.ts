import { TeacherEntity } from "../entities";
import { AddContractType } from "../types";

export abstract class TeachersRepository {
  abstract getTeachers(): Promise<TeacherEntity[]>;
  abstract AddContractsType(id: number, body: AddContractType): Promise<number>;
}
