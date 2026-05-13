import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Car } from "./Car";

export interface TuitionI {
  id?: number;
  date: Date;
  ciudad: string;
  pago: number;
  car_id: number;
}

export class Tuition extends Model<TuitionI> implements TuitionI {
  public id!: number;
  public date!: Date;
  public ciudad!: string;
  public pago!: number;
  public car_id!: number;
}

Tuition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "La fecha debe ser válida", args: true },
        notNull: { msg: "La fecha es obligatoria" },
      },
    },
    ciudad: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La ciudad no puede estar vacía" },
        notNull: { msg: "La ciudad es obligatoria" },
      },
    },
    pago: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "El pago debe ser un número decimal" },
        min: { args: [0], msg: "El pago no puede ser negativo" },
        notNull: { msg: "El pago es obligatorio" },
      },
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "El car_id debe ser un número entero" },
        notNull: { msg: "El car_id es obligatorio" },
      },
    },
  },
  {
    sequelize,
    modelName: "Tuition",
    tableName: "tuition",
    timestamps: false,
  }
);

Car.hasMany(Tuition, {
  foreignKey: "car_id",
  sourceKey: "id",
});
Tuition.belongsTo(Car, {
  foreignKey: "car_id",
  targetKey: "id",
});
