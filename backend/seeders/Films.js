import sequelize from "../config/database.js";
import Film from "../models/Film.js" ;

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const films = [
     {
      title: "Inception",
      synopsis: "Un voleur capable d'entrer dans les rêves des gens pour voler leurs secrets.",
      duration: 148,
      posterUrl: "https://example.com/inception.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
       {
      title: "Road to kabull",
      synopsis: "Un voleur capable d'C’est une comédie d’aventure marocaine réalisée par  (Brahim Chkiri) et sortie en 2012. dans les rêves des gens pour voler leurs secrets.",
      duration: 148,
      posterUrl: "https://example.com/inception.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
      title: "Interstellar",
      synopsis: "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité.",
      duration: 169,
      posterUrl: "https://example.com/interstellar.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
       {
      title: "The Matrix",
      synopsis: "Un hacker découvre que le monde dans lequel il vit est une simulation.",
      duration: 136,
      posterUrl: "https://example.com/matrix.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
     
    ];

    await Film.bulkCreate(films);
    console.log("Films seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
