import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';
import { AccessTokenAuthEntity, AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';

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
  async getLoggedInUser(@Req() req: any) {
    return this.authService.signIn(req.user as User);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Res() res: Response, @Body() body: RegisterDto) {
    await this.authService.register(body);

    res.send({registered: true});
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
