FROM node:lts-alpine

WORKDIR /usr/src/app

ENV PORT 3000

COPY package*.json ./
RUN npm ci
COPY src src

EXPOSE $PORT

USER node

CMD [ "npm", "start" ]