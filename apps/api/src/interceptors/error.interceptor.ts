import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from 'pg';
import { UserRoles } from '@eco/types';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  private readonly client: Client;

  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERT,
      }
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
            errorPayload = {
              ...errorPayload,
              body,
              userId,
              name,
              email,
              isEmailConfirmed,
              role,
              companyId,
              request: `${method} ${origin}${url}`,
              params,
              query,
              referer,
            }
          }

          console.log(errorPayload);

          this.emailLog(errorPayload);

          return error;
        })),
      );
  }

  emailLog(errorPayload: any) {
    this.client
      .connect()
      .then(() => {
        this.client.query(
          `SELECT * FROM public."User" WHERE role = '${UserRoles.Admin}'`,
          (error, result) => {
            if (error) {
              console.error('Error executing query', error);
            } else {
              const errorTextParts = Object.entries(errorPayload).map(([key, value]) => (
                `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`
              ));
              result.rows.forEach(({email}) => {
                this.transporter.sendMail(
                  {
                    to: email,
                    subject: 'Application error',
                    html: errorTextParts.join('<br/>')
                  },
                  (error) => {
                    if (error) {
                      console.log('Sending email error log failed', error, email);
                    }
                  }
                );
              });
            }
          }
        );
      })
      .catch((error) => {
        console.error('Connecting to PostgreSQL database failed', error);
      });
  }
}
