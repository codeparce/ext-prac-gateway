FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY dist ./dist

CMD ["npm", "run", "start"]
