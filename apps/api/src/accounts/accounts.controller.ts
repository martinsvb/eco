import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
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
import { UserFull } from '@eco/types';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Accounts')
@Controller(endPoints.accounts)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AccountEntity })
  @ApiResponse({
    status: 201,
    description: 'Account has been successfully created.',
  })
  async create(@Req() {user}: Request, @Body() createAccountDto: CreateAccountDto) {
    return new AccountEntity(
      await this.accountsService.create(createAccountDto, user as UserFull)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AccountEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Accounts has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request) {
    const accounts = await this.accountsService.findAll(user as UserFull);
    return accounts.map((account) => new AccountEntity(account));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully loaded.',
  })
  async findOne(@Req() {user}: Request, @Param('id') id: string) {
    const account = new AccountEntity(await this.accountsService.findOne(id, user as UserFull));
    if (!account) {
      throw new NotFoundException(`Account with ${id} does not exist.`);
    }
    return account;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully updated.',
  })
  async update(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return new AccountEntity(
      await this.accountsService.update(id, updateAccountDto, user as UserFull)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully deleted.',
  })
  async remove(@Req() {user}: Request, @Param('id') id: string) {
    return new AccountEntity(await this.accountsService.remove(id, user as UserFull));
  }
}
