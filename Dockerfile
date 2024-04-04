FROM node:19.5.0-alpine

ENV BACKEND_SERVER_COMISIONES=https://qs-telmex.onrender.com

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

COPY --chown=node:node . .

EXPOSE 8001

CMD npm run install -s -d

CMD npm run start
