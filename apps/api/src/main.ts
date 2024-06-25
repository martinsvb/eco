import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { prismaExceptions } from '@eco/config';
import cookieParser from 'cookie-parser'
import { AppModule } from './app/app.module';
import { ErrorsInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPrefix = process.env.NODE_ENV === 'development' ? 'api' : '';

  app.setGlobalPrefix(apiPrefix);
  const port = process.env.PORT || 3010;

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Econaw api')
      .setDescription('The Econaw API description')
      .setVersion('1.0')
      .addTag('Econaw')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiPrefix, app, document);
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ErrorsInterceptor()
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, prismaExceptions)
  );

  app.use(cookieParser());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${apiPrefix}`
  );
}

bootstrap();
