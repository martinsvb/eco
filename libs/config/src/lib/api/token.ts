import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload, jwtDecode } from 'jwt-decode';

export interface DecodeTokenResult {
    exp: number;
    iat: number;
    isEmailConfirmed: boolean;
    userId: string;
}

export const decodeToken = (token: string): DecodeTokenResult => {
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
