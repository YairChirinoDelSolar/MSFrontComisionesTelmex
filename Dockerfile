FROM node:19.5.0-alpine

ENV BACKEND_SERVER_COMISIONES=https://qs-telmex.onrender.com

WORKDIR /com-app
COPY . .

COPY package*.json ./


EXPOSE 8001

CMD npm run install

CMD npm run start
