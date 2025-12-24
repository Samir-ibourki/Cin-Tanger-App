
import sequelize from "../config/database.js";
import Reservation from "../models/Reservation.js";

async function seedReservation() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const reservations = [
      {
        confirmationCode: "A001",
        seatsCount: 100,
        status: "CONFIRMED",
        sessionId: 1,  
      },
      {
        confirmationCode: "A002",
        seatsCount: 100,
        status: "CONFIRMED",
         sessionId: 2,  
      },
      {
        confirmationCode: "A003",
        seatsCount: 100,
        status: "CONFIRMED",
         sessionId: 4, 
      },
        {
        confirmationCode: "A004",
        seatsCount: 100,
        status: "CONFIRMED",
         sessionId: 5, 
      },

         {
        confirmationCode: "A005",
        seatsCount: 100,
        status: "CONFIRMED",
         sessionId: 9, 
      },
    ];

    await Reservation.bulkCreate(reservations);
    console.log("Reservations seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seedReservation();
