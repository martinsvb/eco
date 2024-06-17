import { ApiProperty } from '@nestjs/swagger';
import { Company } from "@prisma/client";
import { Exclude } from 'class-transformer';

export class CompanyEntity implements Company {
  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Company name' })
  name: string;

  @ApiProperty({ description: 'Country code'})
  country: string;

  @ApiProperty({ description: 'Company email', required: false })
  email: string | null;

  @ApiProperty({ description: 'Company ico', required: false })
  ico: string | null;

  @ApiProperty({ description: 'Company vat', required: false })
  vat: string | null;

  @ApiProperty({ description: 'Company address', required: false })
  address: string | null;

  @ApiProperty({ description: 'Company note', required: false })
  note: string | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update', required: false })
  updatedAt: Date | null;
}

export class CompanyContentEntity implements Company {
  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Company name' })
  name: string;

  @ApiProperty({ description: 'Country code'})
  country: string;

  @ApiProperty({ description: 'Company email', required: false })
  email: string | null;

  @ApiProperty({ description: 'Company ico', required: false })
  @Exclude()
  ico: string | null;

  @ApiProperty({ description: 'Company vat', required: false })
  @Exclude()
  vat: string | null;

  @ApiProperty({ description: 'Company address', required: false })
  @Exclude()
  address: string | null;

  @ApiProperty({ description: 'Company note', required: false })
  @Exclude()
  note: string | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update', required: false })
  updatedAt: Date | null;
}
