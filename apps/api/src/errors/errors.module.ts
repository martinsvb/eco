import { Module } from '@nestjs/common';
import { ErrorsService } from './errors.service';
import { ErrorsController } from './errors.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ErrorsController],
  providers: [ErrorsService, UsersService],
})
export class ErrorsModule {}
