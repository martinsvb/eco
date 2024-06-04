import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { prismaExceptions } from '@eco/config';
import { AccountModule } from '../account/account.module';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
import { CompaniesModule } from '../companies/companies.module';
import { ContentModule } from '../content/content.module';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL_ADDRESS}:${process.env.EMAIL_PASSWORD}@${process.env.EMAIL_SMTP}`,
      defaults: {
        from: `"Test" <${process.env.EMAIL_ADDRESS}>`,
        port: 465,
      },
      template: {
        dir: process.cwd() + '/apps/api/src/email/templates',
        adapter: new EjsAdapter({
          inlineCssEnabled: true,
        }),
        options: {
          strict: true,
        },
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    AccountsModule,
    AuthModule,
    CompaniesModule,
    ContentModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [providePrismaClientExceptionFilter(prismaExceptions)],
})
export class AppModule {}
