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
        title: "The Maze Runner",
        synopsis: "Epic sci-fi sequel",
        duration: 165,
        posterUrl:
          "https://i.pinimg.com/736x/c4/eb/ba/c4ebba51f9884760922dcfd095bada40.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "HARRY POTTER",
        synopsis: "Story of atomic bomb",
        duration: 180,
        posterUrl:
          "https://i.pinimg.com/736x/2b/14/da/2b14da6668dcc8e6456ab0ce9bcf1a5d.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Uncharted",
        synopsis:
          "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité.",
        duration: 169,
        posterUrl:
          "https://i.pinimg.com/736x/cf/c1/09/cfc109de26321ca02ca4e5316b83c4f3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The FIGHTER",
        synopsis:
          "Un hacker découvre que le monde dans lequel il vit est une simulation.",
        duration: 136,
        posterUrl:
          "https://i.pinimg.com/736x/63/0a/1f/630a1f7d5f86f848b3f431cf2e2643c9.jpg",
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
