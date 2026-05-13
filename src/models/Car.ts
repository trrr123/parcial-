import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface CarI {
  id?: number;
  marca: string;
  clase: string;
  modelo: string;
  cilindraje: number;
  capacidad: number;
}

export class Car extends Model<CarI> implements CarI {
  public id!: number;
  public marca!: string;
  public clase!: string;
  public modelo!: string;
  public cilindraje!: number;
  public capacidad!: number;
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La marca no puede estar vacía" },
        notNull: { msg: "La marca es obligatoria" },
      },
    },
    clase: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La clase no puede estar vacía" },
        notNull: { msg: "La clase es obligatoria" },
      },
    },
    modelo: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El modelo no puede estar vacío" },
        notNull: { msg: "El modelo es obligatorio" },
      },
    },
    cilindraje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "El cilindraje debe ser un número entero" },
        min: { args: [0], msg: "El cilindraje no puede ser negativo" },
        notNull: { msg: "El cilindraje es obligatorio" },
      },
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "La capacidad debe ser un número entero" },
        min: { args: [1], msg: "La capacidad mínima es 1" },
        notNull: { msg: "La capacidad es obligatoria" },
      },
    },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
  }
);
