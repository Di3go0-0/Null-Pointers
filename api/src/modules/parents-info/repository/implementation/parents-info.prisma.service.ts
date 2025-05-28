import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ParentsInfoRepository } from "../parents-info.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PARENTS_INFO } from "../../constans";
import { ParentsInfoEntity } from "../../entities";
import { PatchParentsInfoType, PostParentsInfoType } from "../../types";

@Injectable()
export class ParentsInfoPrismaService implements ParentsInfoRepository {
  private readonly logger = new Logger(ParentsInfoPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async getParentInfoById(userId: number, parentsInfoId: number): Promise<ParentsInfoEntity[]> {
    try {
      const parentInfo = await this.prisma.parentsInfo.findMany({
        where: {
          id: parentsInfoId,
          studentId: userId,
          student: {
            user: {
              active: true
            }
          }
        },
        select: {
          id: true,
          relationship: true,
          name: true,
          phoneNumber: true,
        }
      })
      return parentInfo;

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error finding parents info by id: ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.GET_PARENTS_INFO, HttpStatus.BAD_REQUEST);
    }
  }

  public async getParentsInfo(userId: number): Promise<ParentsInfoEntity[]> {
    try {
      const parentsInfo = await this.prisma.parentsInfo.findMany({
        where: {
          studentId: userId,
          student: {
            user: {
              active: true
            }
          }
        },
        select: {
          id: true,
          relationship: true,
          name: true,
          phoneNumber: true,
        }
      })
      return parentsInfo;

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error finding parents info : ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.GET_PARENTS_INFO, HttpStatus.BAD_REQUEST);
    }
  }

  public async postParentsInfo(userId: number, body: PostParentsInfoType): Promise<number> {
    try {
      const parentsInfo = await this.prisma.parentsInfo.create({
        data: {
          studentId: userId,
          ...body
        }
      })

      return parentsInfo.id
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error creating parents info : ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.CREATE_PARENTS_INFO, HttpStatus.BAD_REQUEST);
    }
  }

  public async patchTeacher(userId: number, parentsInfoId: number, body: PatchParentsInfoType): Promise<number> {
    try {
      const parentsInfo = await this.prisma.parentsInfo.update({
        where: {
          id: parentsInfoId,
          studentId: userId,
          student: {
            user: {
              active: true,
            }
          }
        },
        data: {
          ...body,
        }
      })

      return parentsInfo.id;

    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating parents info : ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.UPDATED_PARENTS_INFO, HttpStatus.BAD_REQUEST);
    }
  }

  public async existStudent(userId: number): Promise<boolean> {
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          id: userId,
          user: {
            active: true,
          }
        }
      })

      if (!student) {
        throw new HttpException(PARENTS_INFO.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return !!student
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error student not found : ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  public async existParentInfo(parentsInfoId: number): Promise<boolean> {
    try {
      const parentsInfo = await this.prisma.parentsInfo.findUnique({
        where: {
          id: parentsInfoId,
        }
      })

      if (!parentsInfo) {
        throw new HttpException(PARENTS_INFO.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return !!parentsInfo
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error student not found : ${error.message}`);
      throw new HttpException(PARENTS_INFO.ERROR.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }
}

