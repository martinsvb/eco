import { ApiProperty } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BasicUserEntity {
  @ApiProperty({ description: 'Id' })
  id: string;
  
  @ApiProperty({ description: 'User name', required: false })
  name: string | null;

  @ApiProperty({ description: 'User picture', required: false })
  picture: string | null;

  @ApiProperty({ description: 'User rigts' })
  rights: Prisma.JsonValue;

  @ApiProperty({ description: 'User role' })
  role: string;
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
  updatedAt: Date | null;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User email confirmation state', required: false })
  isEmailConfirmed: boolean;

  @ApiProperty({ description: 'User phone', required: false })
  phone: string | null;

  @ApiProperty({ description: 'OTP code', required: false })
  otp: number | null;

  @ApiProperty({ description: 'User origin' })
  origin: string;

  @ApiProperty({ description: 'Company id' })
  companyId: string;

  @ApiProperty({ description: 'User rigts' })
  rights: Prisma.JsonValue;

  @ApiProperty({ description: 'User password' })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'User note', required: false })
  note: string | null;
}

export class ContentUserEntity extends BasicUserEntity implements User {
  constructor(partial: Partial<ContentUserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Date of creation' })
  @Exclude()
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  @Exclude()
  updatedAt: Date | null;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User email confirmation state', required: false })
  isEmailConfirmed: boolean;

  @ApiProperty({ description: 'User phone', required: false })
  phone: string | null;

  @ApiProperty({ description: 'OTP code', required: false })
  @Exclude()
  otp: number | null;

  @ApiProperty({ description: 'User origin' })
  @Exclude()
  origin: string;

  @ApiProperty({ description: 'Company id' })
  @Exclude()
  companyId: string;

  @ApiProperty({ description: 'User rigts' })
  @Exclude()
  rights: Prisma.JsonValue;

  @ApiProperty({ description: 'User role' })
  role: string;

  @ApiProperty({ description: 'User password' })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'User note', required: false })
  note: string | null;
}
