import {
  Injectable,
  ServiceUnavailableException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ICountry, TCountryCode, TLanguageCode, countries } from 'countries-list';
import { TokenPayload } from 'google-auth-library';
import { nanoid } from 'nanoid'
import { pick } from 'ramda';
import { allowedCountries, isTokenValid } from '@eco/config';
import { UserItems, UserOrigins, UserRoles, userRights } from '@eco/types';
import { verification } from '../locales';
import { AccessTokenAuthEntity, FullAuthEntity, RefreshTokenAuthEntity } from './entities/auth.entity';
import { VerifyDto } from './dto/verify.dto';
import { RegisterDto } from './dto/register.dto';
import { InvitationFinishDto } from './dto/invitationFinish.dto';

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
        user: pick([UserItems.Id, UserItems.Name, UserItems.Picture, UserItems.Rights, UserItems.Role], user),
      },
      refreshToken: this.getRefreshToken(user.id)
    }
  }

  getOtpCode = () => Math.floor(100000 + Math.random() * 900000);

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
    if (!user.isEmailConfirmed) {
      throw new UnprocessableEntityException('Confirm your email first');
    }
    if (!user.password) {
      throw new UnprocessableEntityException("User password isn't set");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.getAuthData(user);
  }

  async loginGoogle(
    {
      email,
      name,
      picture,
    }: TokenPayload,
    language: TLanguageCode
  ): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    const country = Object.entries(countries).reduce(
      (acc, [id, {languages}]: [TCountryCode, ICountry]) => (
        languages.includes(language) && allowedCountries.includes(id) ? id : acc
      ),
      allowedCountries[0]
    );

    if (!user && email) {
      const company = await this.prisma.company.create({
        data: {
          name: `${name}-${nanoid()}`,
          country,
        },
      });
      user = await this.prisma.user.create({
        data: {
          email,
          isEmailConfirmed: true,
          name,
          origin: UserOrigins.google,
          picture,
          companyId: company.id,
          rights: userRights[UserRoles.CompanyAdmin],
          role: UserRoles.CompanyAdmin,
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

  async register({
      email,
      password,
      companyName,
      country,
      ico,
      vat,
      address,
      ...rest
    }: RegisterDto,
    language: string
  ): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user && email) {
      const otp = this.getOtpCode();
      const company = await this.prisma.company.create({
        data: {
          name: companyName,
          country,
          ico,
          vat,
          address,
        },
      });
      user = await this.prisma.user.create({
        data: {
          ...rest,
          email,
          password: await bcrypt.hash(password, parseInt(process.env.HASHING_ROUNDS, 10)),
          origin: UserOrigins.internal,
          companyId: company.id,
          rights: userRights[UserRoles.Admin],
          role: UserRoles.Admin,
          otp
        },
      });
      this.sendVerification(email, otp, language);
    }

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    return this.getAuthData(user);
  }

  async invitationFinish({
    email,
    name,
    password,
  }: InvitationFinishDto): Promise<FullAuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    
    user = await this.prisma.user.update({
      where: {
        email
      },
      data: {
        name,
        password: await bcrypt.hash(password, parseInt(process.env.HASHING_ROUNDS, 10)),
        isEmailConfirmed: true
      }
    });

    return this.getAuthData(user);
  }

  async loggedIn({id}: User) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const company = await this.prisma.company.findUnique({ where: { id: user.companyId } });

    return {
      name: user.name,
      picture: user.picture,
      rights: user.rights,
      role: user.role,
      companyName: company.name,
    };
  }

  async resendVerification(email: string, language: string) {
    const otp = this.getOtpCode();

    await this.prisma.user.update({
      where: {
        email
      },
      data: {
        otp
      }
    });

    this.sendVerification(email, otp, language);
  }

  sendVerification(email: string, otp: number, language: string) {

    const translation = verification[language || 'en'];
 
    return this.mailerService
      .sendMail({
        to: email,
        subject: translation.subject,
        template: './verify-email',
        context: {
          otp,
          title: translation.title,
          text: translation.text,
        },
      })
      .catch(() => {
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

    user = await this.prisma.user.update({
      where: {
        email
      },
      data: {
        isEmailConfirmed: true,
        otp: null
      }
    });

    return this.getAuthData(user);
  }
}
