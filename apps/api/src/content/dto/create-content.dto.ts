import { ContentTypes } from '@eco/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Content title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Content text' })
  text: string;

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
}
