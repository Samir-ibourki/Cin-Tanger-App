import Film from "../models/Film.js";
import Salle from "../models/Salle.js";
import Session from "../models/Session.js";
import Reservation from "../models/Reservation.js";
import crypto from "crypto";

export const seedAll = async () => {
  try {
    console.log("Seeding database...");

    // Clear old data (order important)
    await Reservation.destroy({ where: {} });
    await Session.destroy({ where: {} });
    await Film.destroy({ where: {} });
    await Salle.destroy({ where: {} });

    // Films
    const films = await Film.bulkCreate([
      {
        title: "Dune Part Two",
        synopsis: "Epic sci-fi sequel",
        duration: 165,
        posterUrl: "https://image.tmdb.org/dune.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Oppenheimer",
        synopsis: "Story of atomic bomb",
        duration: 180,
        posterUrl: "https://image.tmdb.org/oppenheimer.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Interstellar",
        synopsis:
          "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité.",
        duration: 169,
        posterUrl: "https://example.com/interstellar.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Matrix",
        synopsis:
          "Un hacker découvre que le monde dans lequel il vit est une simulation.",
        duration: 136,
        posterUrl: "https://example.com/matrix.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //  Salles
    const salles = await Salle.bulkCreate([
      {
        name: "Salle A",
        capacity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salle B",
        capacity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salle C",
        capacity: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salle D",
        capacity: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salle E",
        capacity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //  Sessions
    const sessions = await Session.bulkCreate([
      {
        date: "2025-01-10",
        time: "21:00",
        filmId: films[0].id,
        salleId: salles[0].id,
        startTime: new Date("2025-01-10T18:00:00"),
        availableSeats: salles[0].capacity,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-10",
        time: "18:00",
        filmId: films[1].id,
        salleId: salles[1].id,
        startTime: new Date("2025-01-10T21:00:00"),
        availableSeats: salles[1].capacity,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //  Reservations
    await Reservation.bulkCreate([
      {
        confirmationCode: `RES-${crypto
          .randomBytes(4)
          .toString("hex")
          .toUpperCase()}`,
        seatsCount: 2,
        status: "CONFIRMED",
        sessionId: sessions[0].id,
      },
      {
        confirmationCode: `RES-${crypto
          .randomBytes(4)
          .toString("hex")
          .toUpperCase()}`,
        seatsCount: 3,
        status: "CONFIRMED",
        sessionId: sessions[1].id,
      },
    ]);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};
