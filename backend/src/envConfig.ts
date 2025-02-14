import { config } from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

config({ path: path.resolve(process.cwd(), envFile) });

export const getDbConnection = () => {
  return {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
}

export const port = parseInt(process.env.BACKEND_PORT || "8080",10)