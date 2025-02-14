import knex, { Knex } from "knex";
import { getDbConnection } from "./envConfig";

const connection = getDbConnection()

export const db:Knex = knex({
  client: 'pg',
  connection
})