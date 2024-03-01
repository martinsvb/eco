import { HttpStatus } from '@nestjs/common';

export const prismaExceptions = {
  // Prisma Error Code: HTTP Status Response
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};
