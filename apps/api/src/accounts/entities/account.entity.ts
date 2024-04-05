import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class AccountEntity implements Account {
  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Account iban' })
  iban: string;

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
  active?: boolean;

  @ApiProperty({ required: false, nullable: true })
  ownerId: string | null;

  @ApiProperty({ required: false, type: UserEntity })
  owner?: UserEntity;

  constructor({ owner, ...data }: Partial<AccountEntity>) {
    Object.assign(this, data);

    if (owner) {
      this.owner = new UserEntity(owner);
    }
  }
}
