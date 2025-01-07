FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:alpine

COPY --from=build /app/dist /usr/local/apache2/htdocs/

EXPOSE 80