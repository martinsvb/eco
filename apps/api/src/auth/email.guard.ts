import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class EmailGuard implements CanActivate {

  async canActivate(context: any): Promise<boolean> {
    const token = context.args[0].rawHeaders.find((item) => item.includes('Bearer'));

    if (!token) {
      return false;
    }
    
    const decoded = jwtDecode<{userId: String, isEmailConfirmed: boolean}>(token);

    if (!decoded.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
