import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';

@Module({
  imports: [
    JwtGuardModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class TestModule { }
