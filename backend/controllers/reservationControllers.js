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

//Générer code de confirmation

export const generateConfirmationCode = () => {
  return `RES-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};

// CREATE RESERVATION + QR CODE

export const createReservation = async (req, res) => {
  try {
<<<<<<< HEAD
    const { confirmationCode, seatsCount,status,sessionId } = req.body;
=======
    const { sessionId, seatsCount } = req.body;
>>>>>>> 33d5c7490f6fc5c89e70d3a1dd10d8eb268ce924

    //  Validation
    if (!sessionId || !seatsCount) {
      return res.status(400).json({
        success: false,
        message: "sessionId et seatsCount sont requis",
      });
    }

    //  Check session
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    //  Check seats
    if (session.availableSeats < seatsCount) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    //  Générer code + QR
    const confirmationCode = generateConfirmationCode();
    const qrCode = await QRCode.toDataURL(confirmationCode);

    //  Create reservation
    const reservation = await Reservation.create({
<<<<<<< HEAD
      confirmationCode, seatsCount,status,sessionId
=======
      confirmationCode,
      seatsCount,
      status: "CONFIRMED",
      sessionId,
>>>>>>> 33d5c7490f6fc5c89e70d3a1dd10d8eb268ce924
    });

    //  Update seats
    session.availableSeats -= seatsCount;
    await session.save();

    //  Response (Ticket)
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

// GET ALL RESERVATIONS (Test Postman)

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

//GET RESERVATION BY ID

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

//CANCEL RESERVATION

<<<<<<< HEAD
//..not work


export const CancelReservation = async (req, res) => {
=======
export const cancelReservation = async (req, res) => {
>>>>>>> 33d5c7490f6fc5c89e70d3a1dd10d8eb268ce924
  try {
    // const { id } = req.params;
    console.log("Trying to delete reservation with id:", id);
console.log("Trying to delete reservation with id:", req.params.id);
const reservation = await Reservation.findByPk(req.params.id);
console.log("Found reservation:", reservation);
    // const reservation = await Reservation.findByPk(id);
    console.log("Found reservation:", reservation);

<<<<<<< HEAD
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    await reservation.destroy();
    res.json({ message: "Reservation canceled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
=======
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
>>>>>>> 33d5c7490f6fc5c89e70d3a1dd10d8eb268ce924
  }
};
