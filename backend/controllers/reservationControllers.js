
import Reservation from "../models/Reservation.js";

export const createResevation= async (req, res) => {
  try {
    const { confirmationCode, seatsCount,status,sessionId } = req.body;

    const reservation = await Reservation.create({
      confirmationCode, seatsCount,status,sessionId
    });

    res.status(201).json({
      message: "booking created successfully",
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// validation Test en Postman
export const getAllRservation = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// validation Test en Postaman
export const getRservationyId = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//..not work


export const CancelReservation = async (req, res) => {
  try {
    // const { id } = req.params;
    console.log("Trying to delete reservation with id:", id);
console.log("Trying to delete reservation with id:", req.params.id);
const reservation = await Reservation.findByPk(req.params.id);
console.log("Found reservation:", reservation);
    // const reservation = await Reservation.findByPk(id);
    console.log("Found reservation:", reservation);

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    await reservation.destroy();
    res.json({ message: "Reservation canceled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
