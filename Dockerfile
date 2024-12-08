FROM ubuntu:jammy

RUN apt update

RUN apt install -y nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
