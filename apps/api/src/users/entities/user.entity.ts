import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BasicUserEntity {
  @ApiProperty({ description: 'User name', required: false })
  name: string | null;

  @ApiProperty({ description: 'User picture', required: false })
  picture: string | null;
}

export class UserEntity extends BasicUserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt: Date;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User email confirmation state', required: false })
  isEmailConfirmed: boolean;

  @ApiProperty({ description: 'OTP code', required: false })
  otp: number | null;

  @ApiProperty({ description: 'User origin' })
  origin: string;

  @ApiProperty({ description: 'User password' })
  @Exclude()
  password: string;
}
