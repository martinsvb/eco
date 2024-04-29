import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class InvitationFinishDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'User name' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User password' })
  password: string;
}
