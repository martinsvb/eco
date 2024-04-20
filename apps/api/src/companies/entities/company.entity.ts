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
  
  @ApiProperty({ description: 'Company contact', required: false })
  contact: Prisma.JsonValue | null;

  @ApiProperty({ description: 'Company identification', required: false })
  identification: Prisma.JsonValue | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update', required: false })
  updatedAt: Date | null;
}
