FROM node:16-alpine3.14

RUN apk -U upgrade
COPY package*.json ./
WORKDIR /app
RUN npm install

COPY . .
RUN npm run build
EXPOSE 8080

CMD ["npm","start"]