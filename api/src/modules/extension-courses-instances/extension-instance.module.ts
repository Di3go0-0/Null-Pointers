import { Module } from '@nestjs/common';
import { ExtensionInstancesController } from './extension-instance.controller';
import { ExtensionInstancesService } from './extension-instance.service';
import { ExtensionInstancesRepository } from './repository/extension-instances.repository';
import { ExtensionInstancesPrismaService } from './repository/implementation/extension-instances.prisma.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtGuardModule],
  controllers: [ExtensionInstancesController],
  providers: [
    ExtensionInstancesService,
    {
      provide: ExtensionInstancesRepository,
      useClass: ExtensionInstancesPrismaService,
    }
  ]
})
export class ExtensionInstancesModule { }
