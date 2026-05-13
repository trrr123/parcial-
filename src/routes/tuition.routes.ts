import { Router } from "express";
import {
  getTuitions,
  getTuitionById,
  createTuition,
  updateTuition,
  deleteTuition,
} from "../controllers/tuition.controller";

const router = Router();

router.get("/", getTuitions);
router.get("/:id", getTuitionById);
router.post("/", createTuition);
router.put("/:id", updateTuition);
router.delete("/:id", deleteTuition);

export default router;
