import { Module } from '@nestjs/common';
import { EnrollmentsExtensionController } from './enrollments-extension.controller';
import { EnrollmentsExtensionService } from './enrollments-extension.service';
import { EnrollmentsExtensionPrismaService, EnrollmentsExtensionRepository } from './repository';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [JwtGuardModule],
  controllers: [EnrollmentsExtensionController],
  providers: [
    EnrollmentsExtensionService,
    {
      provide: EnrollmentsExtensionRepository,
      useClass: EnrollmentsExtensionPrismaService,
    }
  ]
})
export class EnrollmentsExtensionModule { }
