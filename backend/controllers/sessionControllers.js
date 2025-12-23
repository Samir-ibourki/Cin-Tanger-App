import Session from "../models/Session.js";
import Salle from "../models/Salle.js";

export const createSession = async (req, res, next) => {
  try {
    const { filmId, salleId, date, time } = req.body;

    if (!filmId || !salleId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis : filmId, salleId, date, time",
      });
    }

    const salle = await Salle.findByPk(salleId);
    if (!salle) {
      return res.status(404).json({
        success: false,
        message: "Salle non trouvée",
      });
    }

    const session = await Session.create({
      filmId,
      salleId,
      date,
      time,
      availableSeats: salle.capacity,
    });

    return res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

export const getByFilm = async (req, res, next) => {
  try {
    const { filmId } = req.params;

    if (!filmId) {
      return res.status(400).json({
        success: false,
        message: "filmId est requis",
      });
    }

    const sessions = await Session.findAll({
      where: { filmId },
      include: [{ model: Salle, attributes: ["name", "capacity"] }],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSeats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { seatsToBook } = req.body;

    if (!seatsToBook || seatsToBook <= 0) {
      return res.status(400).json({
        success: false,
        message: "seatsToBook doit etre un nombre positif",
      });
    }

    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "seance non trouvee",
      });
    }

    if (session.availableSeats < seatsToBook) {
      return res.status(400).json({
        success: false,
        message: "Pas assez de places disponibles",
        available: session.availableSeats,
      });
    }

    session.availableSeats -= seatsToBook;
    await session.save();

    return res.status(200).json({
      success: true,
      data: session,
      message: `${seatsToBook} place(s) réservee avec succes`,
    });
  } catch (error) {
    next(error);
  }
};
