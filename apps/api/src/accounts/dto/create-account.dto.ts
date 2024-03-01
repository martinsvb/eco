import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
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
  @MinLength(24)
  @MaxLength(34)
  @ApiProperty({ description: 'Account iban' })
  iban: string;

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
