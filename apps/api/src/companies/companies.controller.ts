import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { endPoints } from '@eco/config';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CompanyEntity } from './entities/company.entity';
import { UserFull } from '@eco/types';

@ApiTags('Companies')
@Controller(endPoints.companies)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CompanyEntity })
  @ApiResponse({
    status: 201,
    description: 'Company has been successfully created.',
  })
  async create(@Req() {user}: Request, @Body() createCompanyDto: CreateCompanyDto) {
    return new CompanyEntity(
      await this.companiesService.create(user as UserFull, createCompanyDto)
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  @ApiResponse({
    status: 200,
    description: 'Company has been successfully loaded.',
  })
  async findOne(@Req() {user}: Request, @Param('id') id: string) {
    return new CompanyEntity(await this.companiesService.findOne(user as UserFull, id));
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Companies has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request, @Query() query) {
    const companies = await this.companiesService.findAll(user as UserFull, query);
    return companies.map((data) => new CompanyEntity(data));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  @ApiResponse({
    status: 200,
    description: 'Company has been successfully updated.',
  })
  async update(@Req() {user}: Request, @Param('id') id: string, @Body() updateUserDto: UpdateCompanyDto) {
    return new CompanyEntity(await this.companiesService.update(user as UserFull, id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @UseGuards(EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  @ApiResponse({
    status: 200,
    description: 'Company has been successfully deleted.',
  })
  async remove(@Req() {user}: Request, @Param('id') id: string) {
    return new CompanyEntity(await this.companiesService.remove(user as UserFull, id));
  }
}
