import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
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

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('/login-google')
  @ApiOkResponse({ type: AuthEntity })
  async loginGoogle(@Body('token') token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return this.authService.loginGoogle(ticket.getPayload());
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
