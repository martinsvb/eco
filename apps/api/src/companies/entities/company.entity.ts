import { ApiProperty } from '@nestjs/swagger';
import { Company, Prisma } from "@prisma/client";

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
  ico: number | null;

  @ApiProperty({ description: 'Company vat', required: false })
  vat: string | null;

  @ApiProperty({ description: 'Company address', required: false })
  address: string | null;

  @ApiProperty({ description: 'Company identification', required: false })
  identification: Prisma.JsonValue | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update', required: false })
  updatedAt: Date | null;
}
