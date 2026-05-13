import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.MYSQL_NAME || "parcial",
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || 3306),
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    connectTimeout: 30000,
  },
});

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a MySQL");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    return false;
  }
};
