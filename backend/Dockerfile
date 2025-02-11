FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Script per attendere il database e eseguire le migrazioni
COPY ./scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/bin/sh", "-c", "/wait-for-it.sh db:5432 -- npm run migrate && npm run seed && npm start"] 