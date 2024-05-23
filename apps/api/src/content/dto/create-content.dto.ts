import { ContentTypes } from '@eco/types';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Content title' })
  title: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'Content text', required: false })
  text?: Prisma.JsonValue;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Content type' })
  type: ContentTypes;
  
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Content state', required: false })
  state?: string;
  
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Published state', required: false })
  published?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Content date time', required: false })
  dateTime?: string;
}
