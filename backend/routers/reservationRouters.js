
import express from "express";
import {
  createResevation,
  getAllRservation,
  getRservationyId,
} from "../controllers/reservationControllers.js";
import { CancelReservation } from "../controllers/reservationControllers.js";

const router = express.Router();

router.post("/", createResevation);        
router.get("/", getAllRservation);           
router.get("/:id", getRservationyId);     
router.delete("/:id", CancelReservation);


export default router;
