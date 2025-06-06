import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared';
import { JwtGuardService } from 'src/shared/jwt-guard/jwt-guard.service';
import { RolesGuard } from 'src/shared/jwt-guard/jwt-rol-guard.service';
import { ExtensionInstancesService } from './extension-instance.service';
import { GetByStatusExtensionInstancesDto, PatchExtensionInstanceDto, PostExtensionInstanceDto } from './dtos';

@ApiTags('Extesnion Courses Instances')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('extesnion-courses-instances')
export class ExtensionInstancesController {
  constructor(private readonly extensionInstancesService: ExtensionInstancesService) { }

  @Get()
  find() {
    return this.extensionInstancesService.findExtensionCoursesInstances()
  }

  @Get('search')
  findSearch(@Query() querys: GetByStatusExtensionInstancesDto) {
    return this.extensionInstancesService.findExtensionCoursesSearch(querys);
  }

  @Post()
  save(@Body() body: PostExtensionInstanceDto) {
    return this.extensionInstancesService.saveExtensionCourseInstance(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: PatchExtensionInstanceDto) {
    return this.extensionInstancesService.updateExtensionCourseInstance(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.extensionInstancesService.deleteExtensionCourseInstance(id);
  }
}
