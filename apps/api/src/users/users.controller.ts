import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { endPoints } from '@eco/config';
import { UserFull, UserOrigins } from '@eco/types';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EmailGuard } from '../auth/email.guard';

@ApiTags('Users')
@Controller(endPoints.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  async create(@Req() {user}: Request, @Body() createUserDto: CreateUserDto) {
    return new UserEntity(
      await this.usersService.create({
        ...createUserDto,
        origin: UserOrigins.internal,
      }, user as UserFull)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Users has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request, @Query() query) {
    const users = await this.usersService.findAll(user as UserFull, query);
    return users.map((data) => new UserEntity(data));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully loaded.',
  })
  async findOne(@Req() {user}: Request, @Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id, user as UserFull));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated.',
  })
  async update(@Req() {user}: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto, user as UserFull));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully deleted.',
  })
  async remove(@Req() {user}: Request, @Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(id, user as UserFull));
  }
}
