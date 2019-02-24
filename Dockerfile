FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

EXPOSE 4000

COPY . .

CMD ["npm", "start"]