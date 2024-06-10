import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { endPoints } from '@eco/config';
import { UserFull } from '@eco/types';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';

@ApiTags('Contacts')
@Controller(endPoints.contacts)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactEntity })
  @ApiResponse({
    status: 201,
    description: 'Contact has been successfully created.',
  })
  async create(
    @Req() {user}: Request,
    @Body() data: CreateContactDto
  ) {
    return new ContactEntity(
      await this.contactsService.create(user as UserFull, data)
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  @ApiResponse({
    status: 200,
    description: 'Contact has been successfully loaded.',
  })
  async findOne(
    @Req() {user}: Request,
    @Param('id') id: string
  ) {
    return new ContactEntity(await this.contactsService.findOne(user as UserFull, id));
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Contacts has been successfully loaded.',
  })
  async findAll(
    @Req() {user}: Request,
    @Query() query
  ) {
    const contacts = await this.contactsService.findAll(user as UserFull, query);
    return contacts.map((data) => new ContactEntity(data));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  @ApiResponse({
    status: 200,
    description: 'Contact has been successfully updated.',
  })
  async update(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Body() data: UpdateContactDto
  ) {
    return new ContactEntity(await this.contactsService.update(user as UserFull, id, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  @ApiResponse({
    status: 200,
    description: 'Contact has been successfully deleted.',
  })
  async remove(
    @Req() {user}: Request,
    @Param('id') id: string
  ) {
    return new ContactEntity(await this.contactsService.remove(user as UserFull, id));
  }
}
