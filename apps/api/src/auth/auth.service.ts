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
import { UserOrigins } from '@eco/types';
import { v4 as uuidv4 } from 'uuid';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';

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
    return this.jwtService.sign({ id: userId, tokenId: uuidv4() }, { expiresIn: '7d' });
  }

  async login(email: string, password: string): Promise<{authEntity: AuthEntity, refreshToken: string}> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      authEntity: {
        accessToken: this.getAccessToken(user),
        name: user.name,
        picture: user.picture,
      },
      refreshToken: this.getRefreshToken(user.id)
    };
  }

  async loginGoogle({
    email,
    name,
    picture,
  }: TokenPayload): Promise<{authEntity: AuthEntity, refreshToken: string}> {
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

    return {
      authEntity: {
        accessToken: this.getAccessToken(user),
        name: user.name,
        picture: user.picture,
      },
      refreshToken: this.getRefreshToken(user.id)
    };
  }

  async register({email, password}: LoginDto): Promise<AuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user && email) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      user = await this.prisma.user.create({
        data: {
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

    return {
      accessToken: this.getAccessToken(user),
      name: user.name,
      picture: user.picture,
    };
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

  async verify({email, otp}: VerifyDto): Promise<AuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    if (otp !== user.otp) {
      throw new UnauthorizedException('Invalid otp code');
    }

    await this.prisma.user.update({ where: { email }, data: {isEmailConfirmed: true} })

    return {
      accessToken: this.getAccessToken(user),
      name: user.name,
      picture: user.picture,
    };
  }
}
