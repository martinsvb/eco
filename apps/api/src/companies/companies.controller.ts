import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { endPoints } from '@eco/config';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CompanyEntity } from './entities/company.entity';

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
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return new CompanyEntity(
      await this.companiesService.create(createCompanyDto)
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
  async findOne(@Param('id') id: string) {
    return new CompanyEntity(await this.companiesService.findOne(id));
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateCompanyDto) {
    return new CompanyEntity(await this.companiesService.update(id, updateUserDto));
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
  async remove(@Param('id') id: string) {
    return new CompanyEntity(await this.companiesService.remove(id));
  }
}
