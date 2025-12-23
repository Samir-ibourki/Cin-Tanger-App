
import Reservation from "../models/Reservation.js";

export const createResevation= async (req, res) => {
  try {
    const { confirmationCode, seatsCount,status } = req.body;

    const reservation = await Reservation.create({
      confirmationCode, seatsCount,status
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


//..


export const CancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Reservation.findByPk(id);
    if (!booking) return res.status(404).json({ message: "booking not found" });

    await booking.destroy();

    res.json({ message: "booking deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};