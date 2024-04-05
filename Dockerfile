FROM node:19.5.0-alpine

ENV BACKEND_SERVER_COMISIONES=https://qs-telmex.onrender.com

WORKDIR /com-app
COPY . .

COPY package*.json ./


CMD npm run install

EXPOSE 8001

CMD npm i concurrently

CMD npm run start
