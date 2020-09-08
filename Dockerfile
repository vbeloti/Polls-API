FROM node:14
WORKDIR /usr/src/polls-api
COPY ./package.json .
RUN npm install --only=prod
