import { Request, Response } from "express";
import { Tuition } from "../models/Tuition";

export const getTuitions = async (req: Request, res: Response) => {
  try {
    const tuitions = await Tuition.findAll();
    res.json(tuitions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener matrículas", error });
  }
};

export const getTuitionById = async (req: Request, res: Response) => {
  try {
    const tuition = await Tuition.findByPk(Number(req.params.id));
    if (!tuition) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    res.json(tuition);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar matrícula", error });
  }
};

export const createTuition = async (req: Request, res: Response) => {
  try {
    const tuition = await Tuition.create(req.body);
    res.status(201).json(tuition);
  } catch (error) {
    res.status(500).json({ message: "Error al crear matrícula", error });
  }
};

export const updateTuition = async (req: Request, res: Response) => {
  try {
    const tuition = await Tuition.findByPk(Number(req.params.id));
    if (!tuition) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    await tuition.update(req.body);
    res.json(tuition);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar matrícula", error });
  }
};

export const deleteTuition = async (req: Request, res: Response) => {
  try {
    const tuition = await Tuition.findByPk(Number(req.params.id));
    if (!tuition) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    await tuition.destroy();
    res.json({ message: "Matrícula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar matrícula", error });
  }
};
