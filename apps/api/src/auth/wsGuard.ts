import { Injectable, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { isTokenValid } from '@eco/config';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  isTokenValid = async (token?: string) => {
    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.decode(token);
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });

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
