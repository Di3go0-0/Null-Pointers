import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContractsTypeService } from './contracts-type.service';
import { CreateContractsTypesDto, PatchContractsTypesDto } from './dtos';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';

@ApiTags('Contracts Type')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('contracts-type')
export class ContractsTypeController {
  constructor(private readonly contractsTypeService: ContractsTypeService) { }

  @Get(':id')
  async getContractTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.contractsTypeService.getContractsTypeById(id);
  }

  @Get('')
  async getAllContractsType() {
    return this.contractsTypeService.getAllContractsType()
  }

  @Post('')
  async createContractType(@Body() body: CreateContractsTypesDto) {
    return this.contractsTypeService.postContractsType(body);
  }

  @Patch(':id')
  async updateContractType(@Param('id', ParseIntPipe) id: number, @Body() body: PatchContractsTypesDto) {
    return this.contractsTypeService.patchContractsType(id, body)
  }

  @Delete(':id')
  async deleteContractType(@Param('id', ParseIntPipe) id: number) {
    return this.contractsTypeService.deleteContractsType(id);
  }

}
