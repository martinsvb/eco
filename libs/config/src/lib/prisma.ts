import { HttpStatus } from '@nestjs/common';

// Prisma Error Code: HTTP Status Response
export const prismaExceptions = {
  // Common
  P1000: HttpStatus.UNAUTHORIZED,
  P1001: HttpStatus.NOT_FOUND,
  P1002: HttpStatus.SERVICE_UNAVAILABLE,
  P1003: HttpStatus.NOT_FOUND,
  P1008: HttpStatus.SERVICE_UNAVAILABLE,
  P1009: HttpStatus.BAD_REQUEST,

  // Prisma client
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};
