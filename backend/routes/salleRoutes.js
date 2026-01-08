// routes/salleRoutes.js
import express from "express";
import {
  createSalle,
  getAllSalles,
  updateSalle,
  deleteSalle,
} from "../controllers/salleControllers.js";

const router = express.Router();

/**
 * @swagger
 * /salle:
 *   get:
 *     summary: Get all salles
 *     tags: [Salles]
 */

router.get("/", getAllSalles);

/**
 * @swagger
 * /salle:
 *   post:
 *     summary: Create salle
 *     tags: [Salles]
 */

router.post("/", createSalle);

router.put("/:id", updateSalle);

router.delete("/:id", deleteSalle);

export default router;
