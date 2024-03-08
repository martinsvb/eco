import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserOrigins } from '@eco/types';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EmailGuard } from '../auth/email.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(
      await this.usersService.create({
        ...createUserDto,
        origin: UserOrigins.internal,
      })
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
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
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
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id));
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
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
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
