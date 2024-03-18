import { ApiProperty } from '@nestjs/swagger';
import { BasicUserEntity } from '../../users/entities/user.entity';

export class AccessTokenAuthEntity {
  @ApiProperty({ description: 'Application access token' })
  accessToken: string;
}

export class RefreshTokenAuthEntity {
  @ApiProperty({ description: 'Application refresh token' })
  refreshToken: string;
}

export class AuthEntity extends AccessTokenAuthEntity {
  @ApiProperty({ type: BasicUserEntity })
  user?: BasicUserEntity;
}

export class FullAuthEntity {
  @ApiProperty({ type: AuthEntity })
  auth?: AuthEntity;

  @ApiProperty({ type: RefreshTokenAuthEntity })
  refreshToken: string;
} 
