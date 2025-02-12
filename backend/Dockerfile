FROM node:18

WORKDIR /app

# Installa il client PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Esegui direttamente il backend
CMD ["npm", "run", "start"]