import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'nestjs-prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
