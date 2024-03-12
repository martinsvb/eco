import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload, jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
    if (!token) {
        throw new UnauthorizedException('Missing token');
    }

    try {
        return jwtDecode(token);
    }
    catch (ex) {
        throw new UnauthorizedException('Invalid token');
    }
}

export const isTokenValid = (decoded: JwtPayload) => {
    const now = Number((Date.now() / 1000).toFixed(0));
    return !!decoded.exp && decoded.exp > now;
}
