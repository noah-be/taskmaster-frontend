FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git

ARG REPO_URL=https://github.com/noah-be/private-to-do-list
RUN git clone $REPO_URL .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
