import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { endPoints } from '@eco/config';
import { AccountEntity } from './entities/account.entity';

@ApiTags('Accounts')
@Controller(endPoints.accounts)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiCreatedResponse({ type: AccountEntity })
  @ApiResponse({
    status: 201,
    description: 'Account has been successfully created.',
  })
  async create(@Body() createAccountDto: CreateAccountDto) {
    return new AccountEntity(
      await this.accountsService.create(createAccountDto)
    );
  }

  @Get()
  @ApiOkResponse({ type: AccountEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Accounts has been successfully loaded.',
  })
  async findAll() {
    const accounts = await this.accountsService.findAll();
    return accounts.map((account) => new AccountEntity(account));
  }

  @Get(':id')
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully loaded.',
  })
  async findOne(@Param('id') id: string) {
    const account = new AccountEntity(await this.accountsService.findOne(id));
    if (!account) {
      throw new NotFoundException(`Account with ${id} does not exist.`);
    }
    return account;
  }

  @Patch(':id')
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return new AccountEntity(
      await this.accountsService.update(id, updateAccountDto)
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: AccountEntity })
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    return new AccountEntity(await this.accountsService.remove(id));
  }
}
