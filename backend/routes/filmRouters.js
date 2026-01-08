
import express from "express";
import {
  createFilm,
  getFilms,
  getFilmById,
  updatefilm,
  deletefilm,
} from "../controllers/filmControllers.js"

const router = express.Router();
/**
 * @swagger
 * /film:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: List of films
 */

router.post("/", createFilm);    
/**
 * @swagger
 * /film:
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Film created
 */    
router.get("/", getFilms);        
/**
 * @swagger
 * /film/{id}:
 *   get:
 *     summary: Get film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Film found
 */   
router.get("/:id", getFilmById);     
router.put("/:id", updatefilm);      
router.delete("/:id", deletefilm);   

export default router;
