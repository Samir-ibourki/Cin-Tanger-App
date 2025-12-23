import sequelize from "../config/database.js";
import Session from "../models/Session.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const sessions = [
      {
        date: "2025-01-05",
        time: "18:30:00",
        availableSeats: 120,
        filmId: 1,
        salleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-15",
        time: "21:00:00",
        availableSeats: 80,
        filmId: 4,
        salleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-06",
        time: "20:00:00",
        availableSeats: 100,
        filmId: 3,
        salleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "18:00:00",
        availableSeats: 100,
        filmId: 1,
        salleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "21:00:00",
        availableSeats: 100,
        filmId: 4,
        salleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "21:00:00",
        availableSeats: 100,
        filmId: 2,
        salleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "22:00:00",
        availableSeats: 100,
        filmId: 1,
        salleId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "14:00:00",
        availableSeats: 100,
        filmId: 4,
        salleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2025-01-26",
        time: "14:00:00",
        availableSeats: 100,
        filmId: 2,
        salleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Session.bulkCreate(sessions);
    console.log("✅ Sessions seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

seed();
