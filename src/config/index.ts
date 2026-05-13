import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { sequelize, testConnection } from "../database/db";
import cors from "cors";

import carRoutes from "../routes/car.routes";
import tuitionRoutes from "../routes/tuition.routes";

import "../models/Car";
import "../models/Tuition";

dotenv.config();

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api/cars", carRoutes);
    this.app.use("/api/tuitions", tuitionRoutes);
  }

  private async dbConnection(): Promise<void> {
    try {
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error("No se pudo conectar a MySQL");
      }
      await sequelize.sync({ force: false, alter: false });
      console.log("📦 Base de datos sincronizada");
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      process.exit(1);
    }
  }

  async listen() {
    await this.dbConnection();
    await this.app.listen(this.app.get("port"));
    console.log(`🚀 Servidor en puerto ${this.app.get("port")}`);
  }
}
