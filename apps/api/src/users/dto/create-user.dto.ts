import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ description: 'User name', required: false })
  name?: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt: Date;

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
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'User origin' })
  origin: string;

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
