import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'Contact name' })
  name: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ description: 'Country code' })
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contact email', required: false })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contact phone', required: false })
  phone: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contact ico', required: false })
  ico: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contact vat', required: false })
  vat: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contact address', required: false })
  address: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt?: Date;
}
