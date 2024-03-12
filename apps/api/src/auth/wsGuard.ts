import { Injectable, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isTokenValid } from '@eco/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  isTokenValid = async (token?: string) => {
    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.decode(token);
      const user = await this.usersService.findOne(decoded.userId);

      return isTokenValid(decoded) && !!user && user.isEmailConfirmed;
    } catch (ex) {
      return false;
    }
  };

  async canActivate(context: any): Promise<boolean> {
    const token = context.args[0].handshake.headers.authorization;
    return this.isTokenValid(token);
  }
}
