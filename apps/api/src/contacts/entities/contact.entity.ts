import { ApiProperty } from '@nestjs/swagger';
import { Contact } from "@prisma/client";

export class ContactEntity implements Contact {
  constructor(partial: Partial<ContactEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Contact name' })
  name: string;

  @ApiProperty({ description: 'Country code'})
  country: string;

  @ApiProperty({ description: 'Contact email', required: false })
  email: string | null;

  @ApiProperty({ description: 'Contact phone', required: false })
  phone: string | null;

  @ApiProperty({ description: 'Contact ico', required: false })
  ico: string | null;

  @ApiProperty({ description: 'Contact vat', required: false })
  vat: string | null;

  @ApiProperty({ description: 'Contact address', required: false })
  address: string | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update', required: false })
  updatedAt: Date | null;

  @ApiProperty({ description: 'User id' })
  creatorId: string;

  @ApiProperty({ description: 'Company id' })
  companyId: string;

  @ApiProperty({ description: 'Contact note', required: false })
  note: string | null;
}
