import { ApiProperty } from '@nestjs/swagger';
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

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company email', required: false })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company ico', required: false })
  ico: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company vat', required: false })
  vat: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company address', required: false })
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company note', required: false })
  note: string | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt?: Date;
}
