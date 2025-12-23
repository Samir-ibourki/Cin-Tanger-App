
import express from "express";
import {
  createFilm,
  getFilms,
  getFilmById,
  updatefilm,
  deletefilm,
} from "../controllers/filmControllers.js"

const router = express.Router();

router.post("/", createFilm);        // Create
router.get("/", getFilms);           // Read all
router.get("/:id", getFilmById);     // Read one
router.put("/:id", updatefilm);      // Update
router.delete("/:id", deletefilm);   // Delete

export default router;
