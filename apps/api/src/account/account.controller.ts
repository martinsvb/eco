import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { endPoints } from '@eco/config';
import { AccountService } from './account.service';
import { AccountDto } from './accountDto';

@ApiTags('Account')
@Controller(endPoints.account)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Account has been successfully loaded.',
  })
  @ApiResponse({ status: 404, description: 'Resource is not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getData(): AccountDto {
    return this.accountService.getData();
  }
}
