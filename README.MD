# Api Gateway

## 1. Crear proyecto e inicializar

```bash 
mkdir mi-gateway
cd mi-gateway
pnpm init
```

## 2. Inicializar TypeScript

```bash
pnpm add typescript tsx @types/node --save-dev

pnpm exec tsc --init 
#or 
pnpm dlx tsc --init
```

## 3. Instalar Express y dependencias de desarrollo
```bash 
pnpm add express morgan dotenv
pnpm add -D typescript @types/express @types/node tsx

## para el ORM 
pnpm add prisma @types/pg --save-dev
pnpm add @prisma/client @prisma/adapter-pg pg 
```

## 4. Scripts en package

```json
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:pull": "npx prisma db pull",
    "prisma:push": "npx prisma db push",
    "prisma:generate": "npx prisma generate",
    "prisma:all": "npx prisma db pull && npx prisma db push && npx prisma generate"
  }
```


###  5. Inizializar el ORM

 Ayudarse con la [documentacion oficial prisma](https://www.prisma.io/docs/prisma-orm/quickstart/postgresql) 

```bash 
pnpm dlx prisma
pnpm dlx prisma init --datasource-provider postgresql --output ../generated/prisma
```

### 6. Configuracion de la base y tablas

en el archivo .env deberas modificar la variable `DATABASE_URL` con tu base
y en el archivo `prisma/schema.prisma` es donde se agregara todo el esquema a crear

*NOTA : si ya tienes tablas creadas en base y quieres conservarlas debes correr el comando `pnpm prisma:pull` esto traera las tablas que tengas en base actualizando el  `prisma/schema.prisma` y de ahi se modifica lo nuevo para finalmente realiza el push con `prisma:push`. Y con el comando `prisma:generate` podras genera el modelo para poderlo usar en tu api*

Se debera exportar el modelo con la siguiente configuracion

```ts
##lib/prisma.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };

y lo importas en tus modulos de esta manera
import { prisma } from "./lib/prisma";
```
