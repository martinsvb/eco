import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as qs from 'qs';
import { omit } from 'ramda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRoles } from '@eco/types';
import { PrismaService } from 'nestjs-prisma';
import { routes } from '@eco/config';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  private readonly prisma: PrismaService;

  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.prisma = new PrismaService();
    this.transporter = nodemailer.createTransport(
      `smtps://${process.env.EMAIL_ADDRESS}:${process.env.EMAIL_PASSWORD}@${process.env.EMAIL_SMTP}`,
      {
        from: `"Eco" <${process.env.EMAIL_ADDRESS}>`,
        port: 465,
      }
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error) => throwError(() => {
          let errorPayload: any = {
            dateTime: new Date().toLocaleString(),
            name: error.name,
            code: error.code,
            meta: error.meta,
            type: context.getType(),
          }
          const args = context.getArgs().find((value, index) => [0].includes(index));
          const { body, method, params, rawHeaders, query, url, user } = args || {};
          if (body && method && rawHeaders && url && user) {
            const { id: userId, name: userName, email, isEmailConfirmed, role, companyId } = user;
            const refererIndex = rawHeaders.findIndex((value) => value === 'referer');
            const referer = refererIndex > -1 ? rawHeaders[refererIndex + 1] : '';
            const originIndex = rawHeaders.findIndex((value) => value === 'origin');
            const origin = originIndex > -1 ? rawHeaders[originIndex + 1] : '';
            const queryString = qs.stringify(query);
            errorPayload = {
              ...errorPayload,
              userId,
              userName,
              email,
              isEmailConfirmed,
              role,
              companyId,
              origin,
              request: `${method} ${origin}${url}${queryString ? `?${queryString}` : ''}`,
              params,
              body,
              referer,
            }
          }

          console.error(errorPayload);

          this.databaseLog(errorPayload);

          return error;
        })),
      );
  }

  async databaseLog({origin, ...data}: any) {
    let id;
    try {
      ({ id } = await this.prisma.error.create({data}));
    } catch (error) {
      console.error('Error interceptor database logging failed', error);
    }

    this.emailLog(data, origin, id);
  }

  async emailLog(errorPayload: any, origin?: string, id?: string) {

    try {
      const users = await this.prisma.user.findMany({
        where: {
          role: UserRoles.Admin
        }
      });

      const errorTextParts = [
        '<h3>Eco application error</h3><br>',
        origin && id ? `<a href='${origin}${routes.errors}?id=${id}' target='_blank'>Error</a><br>` : undefined,
        ...Object.entries(
          omit(['userId', 'companyId', 'params', 'type'], errorPayload)
        ).map(([key, value]) => (
          `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`
        ))
      ];

      users.forEach(({email}) => {
        this.transporter.sendMail(
          {
            to: email,
            subject: 'Application error',
            html: errorTextParts.join('<br/>')
          },
          (error) => {
            if (error) {
              console.error('Error interceptor sending email error log failed', error, email);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error interceptor sending email error log failed', error);
    }
  }
}
