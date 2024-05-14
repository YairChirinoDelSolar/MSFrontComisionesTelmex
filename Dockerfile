FROM node:19.5.0-alpine

ENV BACKEND_SERVER_COMISIONES=https://qs-telmex.onrender.com

WORKDIR /com-app
COPY . .

COPY package*.json ./
RUN npm install
RUN npm install concurrently

EXPOSE 8001
CMD [ "npm", "run", "start" ]
