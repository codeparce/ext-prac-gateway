# Api Gateway

## 1. Crear proyecto e inicializar

```bash 
mkdir mi-gateway
cd mi-gateway
pnpm init
```


## 2. Instalar Express y dependencias de desarrollo
```bash 
pnpm add express morgan
pnpm add -D typescript @types/express @types/node tsx
```

## 3. Inicializar TypeScript

```bash
pnpm exec tsc --init
```

## 4. Scripts en package

```json
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
```


### Estructura básica:

    mi-gateway/
    ├── src/
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
