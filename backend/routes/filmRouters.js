
import express from "express";
import {
  createFilm,
  getFilms,
  getFilmById,
  updatefilm,
  deletefilm,
} from "../controllers/filmControllers.js"

const router = express.Router();

router.post("/", createFilm);        
router.get("/", getFilms);           
router.get("/:id", getFilmById);     
router.put("/:id", updatefilm);      
router.delete("/:id", deletefilm);   

export default router;
