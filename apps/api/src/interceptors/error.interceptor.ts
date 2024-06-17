import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Client } from 'pg';
import * as qs from 'qs';
import { omit } from 'ramda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRoles } from '@eco/types';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  private readonly client: Client;

  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.client = new Client(process.env.DATABASE_URL.replace('sslmode=require', 'sslmode=no-verify'));
    this.client
      .connect()
      .then(() => {
        console.log('Error interceptor pg client connected');
      })
      .catch((error) => {
        console.error('Error interceptor pg client connection failed', error);
      });
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
            errorName: error.name,
            code: error.code,
            meta: error.meta,
            type: context.getType(),
          }
          const args = context.getArgs().find((value, index) => [0].includes(index));
          const { body, method, params, rawHeaders, query, url, user } = args || {};
          if (body && method && rawHeaders && url && user) {
            const { id: userId, name, email, isEmailConfirmed, role, companyId } = user;
            const refererIndex = rawHeaders.findIndex((value) => value === 'referer');
            const referer = refererIndex > -1 ? rawHeaders[refererIndex + 1] : '';
            const originIndex = rawHeaders.findIndex((value) => value === 'origin');
            const origin = originIndex > -1 ? rawHeaders[originIndex + 1] : '';
            const queryString = qs.stringify(query);
            errorPayload = {
              ...errorPayload,
              body,
              userId,
              name,
              email,
              isEmailConfirmed,
              role,
              companyId,
              request: `${method} ${origin}${url}${queryString ? `?${queryString}` : ''}`,
              params,
              referer,
            }
          }

          console.error(errorPayload);

          this.emailLog(errorPayload);

          return error;
        })),
      );
  }

  emailLog(errorPayload: any) {
    this.client.query(
      `SELECT * FROM public."User" WHERE role = '${UserRoles.Admin}'`,
      (error, result) => {
        if (error) {
          console.error('Error interceptor getting administrator users failed', error);
        } else {
          const errorTextParts = Object.entries(
            omit(['userId', 'companyId', 'params'], errorPayload)
          ).map(([key, value]) => (
            `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`
          ));
          result.rows.forEach(({email}) => {
            this.transporter.sendMail(
              {
                to: email,
                subject: 'Eco application error',
                html: errorTextParts.join('<br/>')
              },
              (error) => {
                if (error) {
                  console.error('Error interceptor sending email error log failed', error, email);
                }
              }
            );
          });
        }
      }
    );
  }
}
