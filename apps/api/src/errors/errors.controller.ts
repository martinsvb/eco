import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
  Query,
  Post
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { endPoints } from '@eco/config';
import { UserFull } from '@eco/types';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ErrorsService } from './errors.service';
import { UpdateErrorDto } from './dto/update-error.dto';
import { CreateErrorDto } from './dto/create-error.dto';
import { ErrorEntity } from './entities/error.entity';

@ApiTags('Errors')
@Controller(endPoints.errors)
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ErrorEntity })
  @ApiResponse({
    status: 201,
    description: 'Error has been successfully created.',
  })
  async create(
    @Req() {user}: Request,
    @Body() data: CreateErrorDto
  ) {
    return new ErrorEntity(
      await this.errorsService.create(user as UserFull, data)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ErrorEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Errors has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request, @Query() query) {
    const errors = await this.errorsService.findAll(user as UserFull, query);
    return errors.map((error) => new ErrorEntity(error));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ErrorEntity })
  @ApiResponse({
    status: 200,
    description: 'Error has been successfully loaded.',
  })
  async findOne(@Req() {user}: Request, @Param('id') id: string) {
    const error = new ErrorEntity(await this.errorsService.findOne(id, user as UserFull));
    if (!error) {
      throw new NotFoundException(`Error with ${id} does not exist.`);
    }
    return error;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ErrorEntity })
  @ApiResponse({
    status: 200,
    description: 'Error has been successfully updated.',
  })
  async update(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Body() updateErrorDto: UpdateErrorDto
  ) {
    return new ErrorEntity(
      await this.errorsService.update(id, updateErrorDto, user as UserFull)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ErrorEntity })
  @ApiResponse({
    status: 200,
    description: 'Error has been successfully deleted.',
  })
  async remove(@Req() {user}: Request, @Param('id') id: string) {
    return new ErrorEntity(await this.errorsService.remove(id, user as UserFull));
  }
}
