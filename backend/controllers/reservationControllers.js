// import crypto from "crypto";
// import Reservation from "../models/Reservation.js";

// export const generateConfirmationCode = () => {
//   return crypto.randomBytes(4).toString("hex").toUpperCase();
// };

// export const createResevation = async (req, res) => {
//   try {
//     const { confirmationCode, seatsCount, status } = req.body;

//     const reservation = await Reservation.create({
//       confirmationCode,
//       seatsCount,
//       status,
//     });

//     res.status(201).json({
//       message: "booking created successfully",
//       reservation,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // validation Test en Postman
// export const getAllRservation = async (req, res) => {
//   try {
//     const reservations = await Reservation.findAll();
//     res.json(reservations);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // validation Test en Postaman
// export const getRservationyId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const reservation = await Reservation.findByPk(id);

//     if (!reservation) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json(reservation);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //..

// export const CancelReservation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const booking = await Reservation.findByPk(id);
//     if (!booking) return res.status(404).json({ message: "booking not found" });

//     await booking.destroy();

//     res.json({ message: "booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
import crypto from "crypto";
import QRCode from "qrcode";
import Reservation from "../models/Reservation.js";
import Session from "../models/Session.js";

/**
 * Générer code de confirmation
 */
export const generateConfirmationCode = () => {
  return `RES-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};

/**
 * CREATE RESERVATION + QR CODE
 */
export const createReservation = async (req, res) => {
  try {
    const { sessionId, seatsCount } = req.body;

    // 1️⃣ Validation
    if (!sessionId || !seatsCount) {
      return res.status(400).json({
        success: false,
        message: "sessionId et seatsCount sont requis",
      });
    }

    // 2️⃣ Check session
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // 3️⃣ Check seats
    if (session.availableSeats < seatsCount) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // 4️⃣ Générer code + QR
    const confirmationCode = generateConfirmationCode();
    const qrCode = await QRCode.toDataURL(confirmationCode);

    // 5️⃣ Create reservation
    const reservation = await Reservation.create({
      confirmationCode,
      seatsCount,
      status: "CONFIRMED",
      sessionId,
    });

    // 6️⃣ Update seats
    session.availableSeats -= seatsCount;
    await session.save();

    // 7️⃣ Response (Ticket)
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      ticket: {
        id: reservation.id,
        confirmationCode,
        qrCode,
        seatsCount,
        status: reservation.status,
        sessionId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET ALL RESERVATIONS (Test Postman)
 */
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET RESERVATION BY ID
 */
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * CANCEL RESERVATION
 */
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    reservation.status = "CANCELLED";
    await reservation.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
