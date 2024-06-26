# Econaw

## Initialization

npx create-nx-workspace@latest eco
npm i @nx/nest @nx/react @nx/js --save
npm install -g @nestjs/cli
npm install -g nx
npm install -g @nrwl/cli
npm install -g ts-node
nx generate @nx/nest:application apps/api
nx generate @nx/react:application apps/web
nx generate @nx/js:library libs/types
nx generate @nx/js:library libs/config
nx serve api
nx serve web

# Proxy

```
eco\apps\web\proxy.conf.json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}

eco\apps\web\project.json
{
  "targets": {
    "serve": {
      "configurations": {
        "proxyConfig": "apps/web/proxy.conf.json"
      }
    }
  }
}
```

# Swagger

npm install --save @nestjs/swagger

```
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Econaw api')
  .setDescription('The Econaw API description')
  .setVersion('1.0')
  .addTag('Econaw')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup(globalPrefix, app, document);
```

# Helmet

npm i helmet

```
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
```

# Prisma

npm install prisma --save-dev
// Development
npx prisma migrate dev --name "init"
npx prisma migrate dev --create-only // Create a migration without applying it
npx prisma migrate reset
npx prisma db push
npx prisma db seed

// Production
npx prisma migrate deploy
npx prisma migrate resolve

npx tsx prisma/data.ts
npx prisma generate

npm install nestjs-prisma

```
eco\prisma\schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id    Int     @id @default(autoincrement())
  name  String
}

eco\.env

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eco?schema=public"

```

touch prisma/seed.ts

```
eco\prisma\seed.ts

// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy accounts
  const post1 = await prisma.account.upsert({
    where: { id: 'test_1' },
    update: {},
    create: {
      id: 'test_1',
      name: 'Test_1',
    },
  });

  const post2 = await prisma.account.upsert({
    where: { id: 'test_2' },
    update: {},
    create: {
      id: 'test_2',
      name: 'Test_2',
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });


eco\package.json

"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}

```

npx @nestjs/cli generate module prisma
npx @nestjs/cli generate service prisma

```
eco\apps\api\src\prisma\prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {}

eco\apps\api\src\prisma\prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService]
})
export class PrismaModule {}

```

npx @nestjs/cli generate resource

npx @nestjs/cli generate filter prisma-client-exception

## Added the required column to the table without a default value. There are rows in this table,it is not possible to execute this step

In order to run this migration, you need to:
Create the fields first as optional and then run migrate
Fill the fields first with the required date.
Remove the optional (?) from the field.

Prisma automatically adds @updatedAt (it's not done at the database level) so these steps need to be followed.

# Websockets

npm i --save @nestjs/websockets @nestjs/platform-socket.io
nest generate gateway events

# Locales

npm i i18next i18next-browser-languagedetector react-i18next i18next-parser
nx generate @nx/js:library libs/locales
npm run locales-web

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
