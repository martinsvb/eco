import {
  Injectable,
  ServiceUnavailableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { TokenPayload } from 'google-auth-library';
import { isTokenValid } from '@eco/config';
import { UserOrigins } from '@eco/types';
import { nanoid } from 'nanoid'
import { AccessTokenAuthEntity, FullAuthEntity, RefreshTokenAuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  getAccessToken({id, isEmailConfirmed}: User) {
    return this.jwtService.sign({ userId: id, isEmailConfirmed })
  }

  getRefreshToken(userId: string) {
    return this.jwtService.sign({ id: userId, tokenId: nanoid() }, { expiresIn: '7d' });
  }

  getAuthData(user: User) {
    return {
      auth: {
        accessToken: this.getAccessToken(user),
        user: {
          name: user.name,
          picture: user.picture,
        },
      },
      refreshToken: this.getRefreshToken(user.id)
    }
  }

  decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(email: string, password: string): Promise<FullAuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.getAuthData(user);
  }

  async loginGoogle({
    email,
    name,
    picture,
  }: TokenPayload): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user && email) {
      user = await this.prisma.user.create({
        data: {
          email,
          isEmailConfirmed: true,
          name,
          origin: UserOrigins.google,
          picture,
        },
      });
    }

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    return this.getAuthData(user);
  }

  async refresh(oldRefreshToken: string): Promise<AccessTokenAuthEntity & RefreshTokenAuthEntity> {
    const decoded = this.decodeRefreshToken(oldRefreshToken);

    if (!isTokenValid(decoded)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      throw new NotFoundException(`No user found for id: ${decoded.id}`);
    }

    return {
      accessToken: this.getAccessToken(user),
      refreshToken: this.getRefreshToken(user.id)
    };
  }

  async register({email, password, ...rest}: RegisterDto): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user && email) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      user = await this.prisma.user.create({
        data: {
          ...rest,
          email,
          password: await bcrypt.hash(password, parseInt(process.env.HASHING_ROUNDS, 10)),
          origin: UserOrigins.internal,
          otp
        },
      });
      this.sendVerificationLink(email, otp)
    }

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    return this.getAuthData(user);
  }

  async signIn(user: User) {
    return {
      loggedInUser: user,
      accessToken: this.getAccessToken(user),
    };
  }

  sendVerificationLink(email: string, otp: number) {
 
    return this.mailerService
      .sendMail({
        to: email,
        subject: 'Verification link',
        template: './verify-email',
        context: {
          otp,
        },
      })
      .catch((error) => {
        throw new ServiceUnavailableException(`Verification email failed: ${email}`)
      });
  }

  async verify({email, otp}: VerifyDto): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    if (otp !== user.otp) {
      throw new UnauthorizedException('Invalid otp code');
    }

    await this.prisma.user.update({ where: { email }, data: {isEmailConfirmed: true} })

    return this.getAuthData(user);
  }
}
