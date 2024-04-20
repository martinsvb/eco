import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'Company name' })
  name: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ description: 'Country code' })
  country: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt?: Date;

  @IsOptional()
  @ApiProperty({ description: 'Company identification' })
  identification?: Prisma.JsonValue;

  @IsOptional()
  @ApiProperty({ description: 'Company contact' })
  contact?: Prisma.JsonValue;
}
