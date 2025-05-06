import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AcademicProgramsRepository } from "../academic-programs.entity";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { AcademicProgramEntity } from "../../entities";
import { ACADEMIC_PROGRAMS } from "../../constanst";
import { PatchAcademicProgramType, PostAcademicProgramType } from "../../types";
import { TeacherMapper } from "../../mappers/academic-programs.mapper";

@Injectable()
export class AcademicProgramsPrismaService implements AcademicProgramsRepository {
  private readonly logger = new Logger(AcademicProgramsPrismaService.name);
  constructor(private prisma: PrismaService) { }

  public async findAcademicPrograms(): Promise<AcademicProgramEntity[]> {
    try {
      const academicPrograms = await this.prisma.academicProgram.findMany({
        where: {
          active: true
        }
      })

      return TeacherMapper.toDomainList(academicPrograms)
    } catch (error) {
      this.logger.error(`Error getting academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.GET_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAcademicProgramById(id: number): Promise<AcademicProgramEntity[]> {
    try {
      const academicProgram = await this.prisma.academicProgram.findMany({
        where: {
          id,
          active: true
        }
      })

      return TeacherMapper.toDomainList(academicProgram)
    } catch (error) {
      this.logger.error(`Error getting academic-programs by id: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.GET_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }

  public async saveAcademicProgram(body: PostAcademicProgramType): Promise<number> {
    try {
      const academic = await this.prisma.academicProgram.create({
        data: { ...body }
      })

      return academic.id
    } catch (error) {
      this.logger.error(`Error uploading academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.CREATE_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateAcademicProgram(id: number, body: PatchAcademicProgramType): Promise<number> {
    try {
      const academic = await this.prisma.academicProgram.update({
        where: {
          id,
          active: true,
        },
        data: {
          ...body
        }
      })

      return academic.id
    } catch (error) {
      this.logger.error(`Error updating academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.UPDATED_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAcademicProgram(id: number): Promise<number> {
    try {
      const academic = await this.prisma.academicProgram.update({
        where: {
          id,
        },
        data: {
          active: false
        }
      })

      return academic.id
    } catch (error) {
      this.logger.error(`Error deleting academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.DELETE_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateProgramCode(programCode: string): Promise<boolean> {
    try {
      const academic = await this.prisma.academicProgram.findUnique({
        where: {
          active: true,
          programCode
        }
      })

      if (academic) {
        throw new HttpException(ACADEMIC_PROGRAMS.ALERT.PROGRAM_CODE, HttpStatus.CONFLICT);
      }

      return false
    } catch (error) {
      this.logger.error(`Error validating academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.VALIDATE_PROGRAM_CODE, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateProgramCodeOwner(id: number, programCode: string): Promise<boolean> {
    try {
      const academic = await this.prisma.academicProgram.findMany({
        where: {
          active: true,
          programCode
        }
      })

      if (academic[0].id !== id) {
        throw new HttpException(ACADEMIC_PROGRAMS.ALERT.PROGRAM_CODE, HttpStatus.CONFLICT);
      }

      return false
    } catch (error) {
      this.logger.error(`Error validating academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.VALIDATE_PROGRAM_CODE, HttpStatus.BAD_REQUEST);
    }
  }

  public async existAcademicProgram(id: number): Promise<boolean> {
    try {
      const academic = await this.prisma.academicProgram.findUnique({
        where: {
          id,
          active: true,
        }
      })

      if (!academic) {
        throw new HttpException(ACADEMIC_PROGRAMS.ALERT.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return true
    } catch (error) {
      this.logger.error(`Error finding academic-programs: ${error.message}`);
      throw new HttpException(ACADEMIC_PROGRAMS.ERROR.FIND_ACADEMIC_PROGRAMS, HttpStatus.BAD_REQUEST);
    }
  }
}


