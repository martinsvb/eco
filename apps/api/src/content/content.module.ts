import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, UsersService],
})
export class ContentModule {}
