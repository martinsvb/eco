import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ description: 'User name', required: false })
  name: string | null;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User password' })
  password: string;

  @ApiProperty({ description: 'User rigts' })
  rights: Prisma.JsonValue;

  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'Company name' })
  companyName: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ description: 'Country code' })
  country: string;

  @IsOptional()
  @ApiProperty({ description: 'Company identification' })
  identification?: Prisma.JsonValue;

  @IsOptional()
  @ApiProperty({ description: 'Company contact' })
  contact?: Prisma.JsonValue;
}
