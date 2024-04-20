import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ description: 'User name', required: false })
  name?: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @IsOptional()
  @ApiProperty({ description: 'Date of update' })
  updatedAt?: Date;

  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'User email confirmation state', required: false })
  isEmailConfirmed?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'OTP code', required: false })
  otp: number | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User origin' })
  origin: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User company origin' })
  companyId: string;

  @IsOptional()
  @ApiProperty({ description: 'User contact' })
  contact?: Prisma.JsonValue;

  @ApiProperty({ description: 'User rigts' })
  rights: Prisma.JsonValue;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User password' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User picture', required: false })
  picture?: string;
}
