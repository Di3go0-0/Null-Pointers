import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PersonalInfoRepository } from "../personal-info.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PatchPersonalInfoType, PersonalInfoType, PostPersonalInfoType } from "../../types";
import { PERSONAL_INFO_MESSAGES } from "../../constans";

@Injectable()
export class PersonalInfoPrismaSerivce implements PersonalInfoRepository {
  private readonly logger = new Logger(PersonalInfoPrismaSerivce.name);
  constructor(private prisma: PrismaService) { }

  public async getPersonalInfo(userId: number): Promise<PersonalInfoType[]> {
    try {
      await this.existPersonalInfo(userId);

      const personalInfo = await this.prisma.personalInfo.findMany({
        where: {
          id: userId,
          user: {
            active: true
          }
        }
      })

      if (!personalInfo) {
        throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.GET_PERSONAL_INFO, HttpStatus.NOT_FOUND);
      }
      return personalInfo
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error getting peronsal info: ${error.message}`);
      throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.GET_PERSONAL_INFO, HttpStatus.NOT_FOUND);
    }
  }

  public async postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number> {
    const { identificationNumber, birthdate, address, phoneNumber } = body
    try {
      const personalInfo = await this.prisma.personalInfo.create({
        data: {
          id: userId,
          identificationNumber,
          address,
          birthdate,
          phoneNumber,
        }
      })
      return personalInfo.id
    } catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error uploading peronsal info: ${error.message}`);
      throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.POST_PERSONAL_INFO, HttpStatus.BAD_REQUEST);
    }

  }

  public async patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number> {
    try {
      await this.existPersonalInfo(userId);

      const updated = await this.prisma.personalInfo.update({
        where: { id: userId },
        data: { ...body }
      })

      return updated.id
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error updating personal info: ${error.message}`);
      throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.PATCH_PERSONAL_INFO, HttpStatus.BAD_REQUEST);
    }
  }

  private async existPersonalInfo(userId: number): Promise<void> {
    try {
      const existingPersonalInfo = await this.prisma.personalInfo.findUnique({
        where: { id: userId, user: { active: true } }
      });

      if (!existingPersonalInfo) {
        throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error; }
      this.logger.error(`Error personal info not exist: ${error.message}`);
      throw new HttpException(PERSONAL_INFO_MESSAGES.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

  }
}
