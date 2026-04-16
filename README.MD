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
pnpm add express morgan dotenv pg reflect-metadata typeorm
pnpm add -D typescript @types/express @types/node tsx 

## para el ORM 
pnpm add @types/pg --save-dev
```

## 4. Scripts en package

```json
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "tsx dist/index.js"
  }
```
