import { Module } from '@nestjs/common';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import { PasswordsPrismaSerivce, PasswordsRepository } from './repository';
import { EmailModule } from 'src/shared/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [PasswordsController],
  providers: [
    PasswordsService,
    {
      provide: PasswordsRepository,
      useClass: PasswordsPrismaSerivce,
    }
  ]
})
export class PasswordsModule { }
