import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { TeachersService } from './teachers.service';
import { AddContractTypeDto } from './dtos';

@ApiTags('Teachers')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Get()
  async getTeachers() {
    return this.teachersService.getTeachers();
  }

  @Post('contractType/:id')
  async createContractType(@Param('id', ParseIntPipe) id: number, @Body() body: AddContractTypeDto) {
    return this.teachersService.AddContractsType(id, body);
  }
}
