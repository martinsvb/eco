import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { ContentUserEntity } from '../../users/entities/user.entity';

export class AccountEntity implements Account {
  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Account iban' })
  iban: string;

  @ApiProperty({ description: 'Account number' })
  number: string;

  @ApiProperty({ description: 'Account bic' })
  bic: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt: Date;

  @ApiProperty({ description: 'Account name' })
  name: string;

  @ApiProperty({ description: 'Account currency' })
  currency: string;

  @ApiProperty({ description: 'Account description', required: false })
  description: string | null;

  @ApiProperty({ description: 'Active state', required: false })
  active: boolean | null;

  @ApiProperty({ required: false, nullable: true })
  creatorId: string | null;

  @ApiProperty({ description: 'Account creator', required: false, type: ContentUserEntity })
  creator?: ContentUserEntity;

  @ApiProperty({ description: 'Company id' })
  companyId: string;

  constructor({ creator, ...data }: Partial<AccountEntity>) {
    Object.assign(this, data);

    if (creator) {
      this.creator = new ContentUserEntity(creator);
    }
  }
}
