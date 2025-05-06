import { ParentsInfoEntity } from "../entities";
import { PatchParentsInfoType, PostParentsInfoType } from "../types";

export abstract class ParentsInfoRepository {
  abstract getParentInfoById(userId: number, parentsInfoId: number): Promise<ParentsInfoEntity[]>;
  abstract getParentsInfo(userId: number): Promise<ParentsInfoEntity[]>;
  abstract postParentsInfo(userId: number, body: PostParentsInfoType): Promise<number>;
  abstract patchTeacher(userId: number, parentsInfoId: number, body: PatchParentsInfoType): Promise<number>;
  abstract existStudent(userId: number): Promise<boolean>;
  abstract existParentInfo(parentsInfoId: number): Promise<boolean>;
}
