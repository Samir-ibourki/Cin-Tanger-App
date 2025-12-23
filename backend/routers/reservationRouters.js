
import express from "express";
import {
  createResevation,
  getAllRservation,
  getRservationyId,
CancelReservation,
} from "../controllers/reservationControllers.js"

const router = express.Router();

router.post("/", createResevation);        
router.get("/", getAllRservation);           
router.get("/:id", getRservationyId);     
router.put("/:id", CancelReservation);      

export default router;
