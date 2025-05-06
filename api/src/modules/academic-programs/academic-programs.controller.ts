import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { AcademicProgramsService } from './academic-programs.service';
import { AcademicProgramEntity } from './entities';
import { PatchAcademicProgramDto, PostAcademicProgramDto } from './dtos';

@ApiTags('Academic Programs')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService, RolesGuard)
@Roles('ADMIN')
@Controller('academic-programs')
export class AcademicProgramsController {
  constructor(private readonly academicProgramsService: AcademicProgramsService) { }

  @Get('')
  async findAcademicPrograms(): Promise<AcademicProgramEntity[]> {
    return this.academicProgramsService.findAcademicPrograms()
  }

  @Get('/:id')
  async findAcademicProgramById(@Param('id', ParseIntPipe) id: number): Promise<AcademicProgramEntity[]> {
    return this.academicProgramsService.findAcademicProgramById(id);
  }

  @Post('')
  async saveAcademicProgram(@Body() body: PostAcademicProgramDto): Promise<number> {
    return this.academicProgramsService.saveAcademicProgram(body);
  }

  @Patch('/:id')
  async updateAcademicProgram(@Param('id', ParseIntPipe) id: number, @Body() body: PatchAcademicProgramDto): Promise<number> {
    return this.academicProgramsService.updateAcademicProgram(id, body);
  }

  @Delete('/:id')
  async deleteAcademicProgram(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.academicProgramsService.deleteAcademicProgram(id);
  }

}
