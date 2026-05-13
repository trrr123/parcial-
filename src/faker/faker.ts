import { faker } from "@faker-js/faker/locale/es";
import { sequelize } from "../database/db";
import { Car } from "../models/Car";
import { Tuition } from "../models/Tuition";

const MARCAS = ["Toyota", "Chevrolet", "Mazda", "Renault", "Ford", "Honda", "Kia", "Hyundai", "Nissan", "BMW"];
const CLASES = ["Sedán", "SUV", "Camioneta", "Hatchback", "Coupé", "Convertible", "Van", "Pick-up"];
const CIUDADES = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales"];

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

async function createFakeData() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL");

    await Tuition.destroy({ where: {} });
    await Car.destroy({ where: {} });

    const cars = await Car.bulkCreate(
      range(20).map(() => ({
        marca: MARCAS[Math.floor(Math.random() * MARCAS.length)],
        clase: CLASES[Math.floor(Math.random() * CLASES.length)],
        modelo: String(faker.date.between({ from: "2015-01-01", to: "2025-01-01" }).getFullYear()),
        cilindraje: faker.helpers.arrayElement([1400, 1600, 1800, 2000, 2400, 3000]),
        capacidad: faker.helpers.arrayElement([2, 4, 5, 7, 8]),
      }))
    );

    console.log(`🚗 ${cars.length} carros creados`);

    const tuitions = await Tuition.bulkCreate(
      range(20).map(() => ({
        date: faker.date.between({ from: "2024-01-01", to: "2025-12-31" }).toISOString().slice(0, 10),
        ciudad: CIUDADES[Math.floor(Math.random() * CIUDADES.length)],
        pago: parseFloat((Math.random() * 5000000 + 500000).toFixed(2)),
        car_id: cars[Math.floor(Math.random() * cars.length)].id,
      }))
    );

    console.log(`📋 ${tuitions.length} matrículas creadas`);
    console.log("🎉 Datos insertados correctamente");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await sequelize.close();
  }
}

createFakeData();
