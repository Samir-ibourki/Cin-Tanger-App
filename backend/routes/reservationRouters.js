import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservationControllers.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.put("/:id", cancelReservation);

export default router;
