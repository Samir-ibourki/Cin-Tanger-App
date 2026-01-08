import Film from "../models/Film.js";
import Salle from "../models/Salle.js";
import Session from "../models/Session.js";
import Reservation from "../models/Reservation.js";
import crypto from "crypto";

export const seedAll = async () => {
  try {
    console.log("Seeding database...");

    // Clear old data and reset IDs
    await Reservation.truncate({ cascade: true, restartIdentity: true });
    await Session.truncate({ cascade: true, restartIdentity: true });
    await Film.truncate({ cascade: true, restartIdentity: true });
    await Salle.truncate({ cascade: true, restartIdentity: true });

    // Films
    const films = await Film.bulkCreate([
      {
        title: "The Maze Runner",
        genre: "Sci-Fi",
        posterUrl: "https://i.pinimg.com/736x/c4/eb/ba/c4ebba51f9884760922dcfd095bada40.jpg",
        duration: 165,
        rating: 7.8,
        showtime_count: 4,
        description: "Dans un monde mystérieux entouré de murs géants, un jeune homme se réveille sans aucun souvenir de son passé. Rapidement, il découvre qu'il fait partie d'un groupe de garçons piégés dans un labyrinthe mortel. Ensemble, ils devront affronter leurs peurs, résoudre les énigmes et risquer leur vie pour espérer retrouver la liberté.",
      },
      {
        title: "Harry Potter",
        genre: "Fantasy",
        posterUrl: "https://i.pinimg.com/736x/2b/14/da/2b14da6668dcc8e6456ab0ce9bcf1a5d.jpg",
        duration: 180,
        rating: 8.6,
        showtime_count: 5,
        description: "Un jeune orphelin découvre le jour de ses onze ans qu'il est en réalité un sorcier. Il rejoint l'école de sorcellerie de Poudlard où il se lie d'amitié, affronte des forces obscures et découvre son destin extraordinaire dans le monde magique.",
      },
      {
        title: "Uncharted",
        genre: "Aventure",
        posterUrl: "https://i.pinimg.com/736x/cf/c1/09/cfc109de26321ca02ca4e5316b83c4f3.jpg",
        duration: 169,
        rating: 7.2,
        showtime_count: 3,
        description: "Nathan Drake, un chasseur de trésors audacieux, se lance dans une quête périlleuse à travers le monde à la recherche d'un trésor légendaire perdu depuis des siècles.",
      },
      {
        title: "The Fighter",
        genre: "Drame",
        posterUrl: "https://i.pinimg.com/736x/63/0a/1f/630a1f7d5f86f848b3f431cf2e2643c9.jpg",
        duration: 136,
        rating: 8.1,
        showtime_count: 2,
        description: "L'histoire vraie d'un boxeur déterminé à se battre contre la pauvreté, les conflits familiaux et ses propres démons pour atteindre la gloire.",
      },
      {
        title: "Road to Kabul",
        genre: "Action",
        posterUrl: "https://i.pinimg.com/736x/8f/60/41/8f6041e98b90d408fcd2727790a9d833.jpg",
        duration: 128,
        rating: 7.2,
        showtime_count: 3,
        description: "Dans le chaos de la chute de Kaboul en 2021, un journaliste français et son fixeur afghan tentent désespérément d'évacuer leurs familles.",
      },
      {
        title: "The Matrix",
        genre: "Cyberpunk",
        posterUrl: "https://i.pinimg.com/736x/ed/45/16/ed4516338fa5df348c13a2a7ce1e7998.jpg",
        duration: 136,
        rating: 6.8,
        showtime_count: 4,
        description: "Thomas Anderson mène une double vie: le jour, il est programmeur informatique ordinaire, la nuit, il est Neo.",
      },
      {
        title: "Khnifiss Rmad",
        genre: "Culture",
        posterUrl: "https://i.pinimg.com/1200x/c4/7c/ba/c47cba83e7cb211b410f46ae9697b02b.jpg",
        duration: 142,
        rating: 8.8,
        showtime_count: 5,
        description: "Dans un village reculé du sud marocain, entre dunes de sable et traditions ancestrales...",
      },
      {
        title: "Faracha",
        genre: "Comedy",
        posterUrl: "https://www.ccm.ma/cin/phfilm/727-phFilmLm1.jpg",
        duration: 118,
        showtime_count: 4,
        rating: 9.8,
        description: "À Casablanca, Farah, une jeune wedding planner ambitieuse et moderne, jongle entre l'organisation de mariages somptueux.",
      },
    ]);

    //  Salles
    const salles = await Salle.bulkCreate([
      { name: "Salle A", capacity: 50 },
      { name: "Salle B", capacity: 100 },
      { name: "Salle C", capacity: 75 },
      { name: "Salle D", capacity: 120 },
      { name: "Salle E", capacity: 200 },
    ]);

    // Sessions - Generate for ALL films
    const sessionsData = [];
    const times = ["14:00", "16:30", "19:00", "21:30"];
    const dates = ["2026-01-10", "2026-01-11", "2026-01-12"];

    films.forEach((film) => {
      // Add 3 sessions for each film
      for (let i = 0; i < 3; i++) {
        const salle = salles[Math.floor(Math.random() * salles.length)];
        const date = dates[i % dates.length];
        const time = times[Math.floor(Math.random() * times.length)];

        sessionsData.push({
          date: date,
          time: time,
          filmId: film.id,
          salleId: salle.id,
          availableSeats: salle.capacity,
        });
      }
    });

    const sessions = await Session.bulkCreate(sessionsData);

    console.log("Seeding completed successfully with session for all films!");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};
