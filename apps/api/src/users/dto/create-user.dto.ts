import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User phone', required: false })
  phone: string | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'OTP code', required: false })
  otp: number | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User origin' })
  origin: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'User rigts', required: false })
  rights: Prisma.JsonValue;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User role' })
  role: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiProperty({ description: 'User password', required: false })
  password: string | null;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiProperty({ description: 'User old password', required: false })
  passwordOld: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User picture', required: false })
  picture?: string;
}
