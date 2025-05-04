import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { PersonalInfoService } from './personal-info.service';
import { PatchPersonalInfoDto, PostPersonalInfoDto } from './dtos';

@ApiTags('Personal Info')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('personal-info')
export class PersonalInfoController {
  constructor(
    private readonly personalInfoService: PersonalInfoService,
  ) { }

  @Get(':id')
  async getPersonalInfo(@Param('id', ParseIntPipe) userId: number) {
    return this.personalInfoService.getPersonalInfo(userId)
  }

  @Post(':id')
  async postPersonalInfo(@Param('id', ParseIntPipe) userId: number, @Body() body: PostPersonalInfoDto) {
    return this.personalInfoService.postPersonalInfo(userId, body);
  }

  @Patch(':id')
  async patchPersonalInfo(@Param('id', ParseIntPipe) userId: number, @Body() body: PatchPersonalInfoDto) {
    return this.personalInfoService.patchPersonalInfo(userId, body);
  }

}
