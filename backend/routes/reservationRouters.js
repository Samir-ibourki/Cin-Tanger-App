import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservationControllers.js";

const router = express.Router();
/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create reservation
 *     tags: [Reservations]
 *     responses:
 *       201:
 *         description: Reservation created
 */

router.post("/", createReservation);
/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 */
router.get("/", getAllReservations);

router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.put("/:id", cancelReservation);

export default router;
