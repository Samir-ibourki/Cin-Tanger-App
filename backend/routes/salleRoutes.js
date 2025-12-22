// routes/salleRoutes.js
import express from "express";
import {
  createSalle,
  getAllSalles,
  updateSalle,
  deleteSalle,
} from "../controllers/salleControllers.js";

const router = express.Router();

router.get("/", getAllSalles);

router.post("/", createSalle);

router.put("/:id", updateSalle);

router.delete("/:id", deleteSalle);

export default router;
