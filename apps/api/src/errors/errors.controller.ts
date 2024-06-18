import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Req, UseGuards, Query } from '@nestjs/common';
import { Request } from 'express';
import { ErrorsService } from './errors.service';
import { UpdateErrorDto } from './dto/update-error.dto';
import { endPoints } from '@eco/config';
import { UserFull } from '@eco/types';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ErrorEntity } from './entities/error.entity';

@ApiTags('Errors')
@Controller(endPoints.errors)
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

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
