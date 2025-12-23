
import sequelize from "../config/database.js";
import Salle from "../models/Salle.js";

async function seedSalle() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const salles = [
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
     
    ];

    await Salle.bulkCreate(salles);
    console.log("Salle seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seedSalle();
