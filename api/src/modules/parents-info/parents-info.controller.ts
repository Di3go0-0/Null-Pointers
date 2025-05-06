import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { ParentsInfoService } from './parents-info.service';
import { PatchParentsInfoDto, PostParentsInfoDto } from './dtos';


@ApiTags('Parents Info')
@Controller('parents-info')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
export class ParentsInfoController {
  constructor(private readonly parentsInfoService: ParentsInfoService) { }

  @Get('/byId/:userId')
  async getParentById(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('parentsInfoId', ParseIntPipe) parentsInfoId: number,
  ) {
    return this.parentsInfoService.getParentInfoById(userId, parentsInfoId)
  }

  @Get('/:userId')
  async getParents(@Param('userId', ParseIntPipe) userId: number,) {
    return this.parentsInfoService.getParentsInfo(userId);
  }


  @Post('/:userId')
  async creteParent(@Param('userId', ParseIntPipe) userId: number, @Body() body: PostParentsInfoDto) {
    return this.parentsInfoService.postParentsInfo(userId, body)
  }

  @Patch('/:userId')
  async patchParent(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('parentsInfoId', ParseIntPipe) parentsInfoId: number,
    @Body() body: PatchParentsInfoDto
  ) {
    return this.parentsInfoService.patchTeacher(userId, parentsInfoId, body)
  }
}


