import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateErrorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Error date time' })
  dateTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Error name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Error code', required: false })
  code?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'Error meta data', required: false })
  meta?: Prisma.JsonValue;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Error type', required: false })
  type?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User id', required: false })
  userId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User name', required: false })
  userName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User e-mail', required: false })
  email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'User e-mail confirmed', required: false })
  isEmailConfirmed?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User role', required: false })
  role?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Company id', required: false })
  companyId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Request method and url', required: false })
  request?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'Request params', required: false })
  params?: Prisma.JsonValue;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'Request body', required: false })
  body?: Prisma.JsonValue;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Client referer', required: false })
  referer?: string;
}
