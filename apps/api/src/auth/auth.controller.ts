import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';
import { AccessTokenAuthEntity, AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { EmailGuard } from './email.guard';
import { JwtAuthGuard } from './jwt.guard';
import { BasicUserEntity } from '../users/entities/user.entity';
import { InvitationFinishDto } from './dto/invitationFinish.dto';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  setRefreshtoken(res: Response, refreshToken: string) {
    res.cookie(
      'refreshToken',
      refreshToken,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      }
    );    
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Res() res: Response, @Body() { email, password }: LoginDto) {
    const { auth, refreshToken } = await this.authService.login(email, password);

    this.setRefreshtoken(res, refreshToken);

    res.send(auth);
  }

  @Post('/login-google')
  @ApiOkResponse({ type: AuthEntity })
  async loginGoogle(@Res() res: Response, @Body('idToken') idToken, @Body('language') language) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { auth, refreshToken } = await this.authService.loginGoogle(ticket.getPayload(), language);

    this.setRefreshtoken(res, refreshToken);

    res.send(auth);
  }

  @Post('refresh')
  @ApiOkResponse({ type: AccessTokenAuthEntity })
  async refresh(@Res() res: Response, @Req() req: Request) {
    const { accessToken, refreshToken } = await this.authService.refresh(req.cookies['refreshToken']);
    
    this.setRefreshtoken(res, refreshToken);
    
    res.send({accessToken});
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BasicUserEntity })
  getLoggedInUser(@Req() {user}: Request) {
    return this.authService.loggedIn(user as User);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Res() res: Response, @Body() body: RegisterDto) {
    await this.authService.register(body);

    res.send({registered: true});
  }

  @Patch('invitation-finish')
  @ApiOkResponse({ type: AuthEntity })
  async invitationFinish(@Res() res: Response, @Body() body: InvitationFinishDto) {
    const { auth, refreshToken } = await this.authService.invitationFinish(body);

    this.setRefreshtoken(res, refreshToken);

    res.send(auth);
  }

  @Post('verify')
  @ApiOkResponse({ type: AuthEntity })
  async verify(@Res() res: Response, @Body() body: VerifyDto) {
    const { auth, refreshToken } = await this.authService.verify(body);

    this.setRefreshtoken(res, refreshToken);

    res.send(auth);
  }

  @Post('resend')
  async resend(@Body('email') email) {
    await this.authService.resendVerification(email);
    return {resent: true};
  }
}
