import { Request, Response } from "express";
import { Car } from "../models/Car";

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carros", error });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByPk(Number(req.params.id));
    if (!car) {
      res.status(404).json({ message: "Carro no encontrado" });
      return;
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar carro", error });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al crear carro", error });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByPk(Number(req.params.id));
    if (!car) {
      res.status(404).json({ message: "Carro no encontrado" });
      return;
    }
    await car.update(req.body);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar carro", error });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByPk(Number(req.params.id));
    if (!car) {
      res.status(404).json({ message: "Carro no encontrado" });
      return;
    }
    await car.destroy();
    res.json({ message: "Carro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar carro", error });
  }
};
