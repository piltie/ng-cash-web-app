import { Sequelize } from "sequelize"
import config from "config"

const dbUri = config.get<string>("dbUri");
export const sequelize = new Sequelize(dbUri, {dialect: 'postgres'});

export default async function connect() {
  try {
    console.log("Testing database connection...")

    await sequelize.sync();
    await sequelize.authenticate();
    
    console.log("Connected to the database.")
  } catch (error: any) {
    console.error("ERROR - Couldn't connect to the database:", error);
  }
}