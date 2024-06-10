import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'Account name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'Account currency' })
  currency: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(34)
  @ApiProperty({ description: 'Account iban' })
  iban: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Account number' })
  number: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Account bank code' })
  bankCode: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(11)
  @ApiProperty({ description: 'Account bic' })
  bic: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ description: 'Description', required: false })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Active state', required: false })
  active?: boolean;
}
