import express from "express";
import {
  getByFilm,
  createSession,
  updateSeats,
} from "../controllers/sessionControllers.js";

const router = express.Router();

router.post("/", createSession);
router.get("/film/:filmId", getByFilm);
router.patch("/:id/seats", updateSeats);

export default router;
