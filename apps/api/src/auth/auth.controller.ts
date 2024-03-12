import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
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
    const { authEntity, refreshToken } = await this.authService.login(email, password);

    this.setRefreshtoken(res, refreshToken);

    res.send(authEntity);
  }

  @Post('/login-google')
  @ApiOkResponse({ type: AuthEntity })
  async loginGoogle(@Res() res: Response, @Body('token') token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { authEntity, refreshToken } = await this.authService.loginGoogle(ticket.getPayload());

    this.setRefreshtoken(res, refreshToken);

    res.send(authEntity);
  }

  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const { accessToken, refreshToken } = await this.authService.refresh(req.cookies['refreshToken']);
    
    this.setRefreshtoken(res, refreshToken);
    
    res.send(accessToken);
  }

  @Get('user')
  async getLoggedInUser(@Req() req: any) {
    return this.authService.signIn(req.user as User);
  }

  @Post('register')
  async register(@Body() registrationData: LoginDto) {
    const user = await this.authService.register(registrationData);
    return user;
  }

  @Post('verify')
  async verify(@Body() verificationData: VerifyDto) {
    const user = await this.authService.verify(verificationData);
    return user;
  }
}
