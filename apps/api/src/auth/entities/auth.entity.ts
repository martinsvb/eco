import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty({ description: 'Application access token' })
  accessToken: string;

  @ApiProperty({ description: 'User name', required: false })
  name: string | null;

  @ApiProperty({ description: 'User picture', required: false })
  picture: string | null;
}
