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
        posterUrl:
          "https://i.pinimg.com/736x/c4/eb/ba/c4ebba51f9884760922dcfd095bada40.jpg",
        duration: 165,
        rating: 7.8,
        showtime_count: 4,
        description:
          "Dans un monde mystérieux entouré de murs géants, un jeune homme se réveille sans aucun souvenir de son passé. Rapidement, il découvre qu'il fait partie d'un groupe de garçons piégés dans un labyrinthe mortel. Ensemble, ils devront affronter leurs peurs, résoudre les énigmes et risquer leur vie pour espérer retrouver la liberté.",
      },

      {
        title: "Harry Potter",
        posterUrl:
          "https://i.pinimg.com/736x/2b/14/da/2b14da6668dcc8e6456ab0ce9bcf1a5d.jpg",
        duration: 180,

        rating: 8.6,
        showtime_count: 5,
        description:
          "Un jeune orphelin découvre le jour de ses onze ans qu'il est en réalité un sorcier. Il rejoint l'école de sorcellerie de Poudlard où il se lie d'amitié, affronte des forces obscures et découvre son destin extraordinaire dans le monde magique.",
      },

      {
        title: "Uncharted",
        posterUrl:
          "https://i.pinimg.com/736x/cf/c1/09/cfc109de26321ca02ca4e5316b83c4f3.jpg",
        duration: 169,

        rating: 7.2,
        showtime_count: 3,
        description:
          "Nathan Drake, un chasseur de trésors audacieux, se lance dans une quête périlleuse à travers le monde à la recherche d'un trésor légendaire perdu depuis des siècles. Entre pièges mortels et ennemis redoutables, l'aventure ne fait que commencer.",
      },

      {
        title: "The Fighter",
        posterUrl:
          "https://i.pinimg.com/736x/63/0a/1f/630a1f7d5f86f848b3f431cf2e2643c9.jpg",
        duration: 136,

        rating: 8.1,
        showtime_count: 2,
        description:
          "L'histoire vraie d'un boxeur déterminé à se battre contre la pauvreté, les conflits familiaux et ses propres démons pour atteindre la gloire. Un portrait intense de courage, de sacrifice et de résilience.",
      },

      {
        title: "Road to Kabul",
        posterUrl:
          "https://i.pinimg.com/736x/8f/60/41/8f6041e98b90d408fcd2727790a9d833.jpg",
        duration: 128,
        rating: 7.2,
        showtime_count: 3,
        description:
          "Dans le chaos de la chute de Kaboul en 2021, un journaliste français et son fixeur afghan tentent désespérément d'évacuer leurs familles avant l'arrivée des Talibans. Ce thriller haletant nous plonge au cœur de l'effondrement du gouvernement afghan, suivant le périple dangereux de ces hommes qui risquent tout pour sauver leurs proches. Entre les checkpoints, les trahisons et la course contre la montre, le film dépeint avec une intensité bouleversante les derniers jours de liberté à Kaboul. Inspiré de faits réels, Road to Kabul nous offre un regard poignant sur la crise humanitaire afghane, l'amitié qui transcende les frontières, et le courage extraordinaire des personnes ordinaires face à l'adversité. Un film nécessaire qui témoigne d'un moment crucial de l'histoire récente.",
      },
      {
        title: "The Matrix",
        posterUrl:
          "https://i.pinimg.com/736x/ed/45/16/ed4516338fa5df348c13a2a7ce1e7998.jpg",
        duration: 136,
        rating: 6.8,
        showtime_count: 4,
        description:
          "Thomas Anderson mène une double vie: le jour, il est programmeur informatique ordinaire dans une grande entreprise, la nuit, il est Neo, un hacker de génie recherché par la police. Sa vie bascule quand il rencontre Morpheus, un mystérieux rebelle qui lui révèle la vérité terrifiante: le monde dans lequel il vit n'est qu'une simulation informatique créée par des machines intelligentes pour asservir l'humanité. La réalité est un désert post-apocalyptique où les humains survivants mènent une guerre désespérée contre leurs créations. Neo doit choisir entre retourner à son existence confortable mais illusoire, ou rejoindre la résistance et découvrir l'étendue de ses capacités. Les Wachowski signent un chef-d'œuvre visionnaire qui révolutionne le cinéma d'action avec ses effets spéciaux innovants et pose des questions philosophiques profondes sur la nature de la réalité, le libre arbitre et la conscience.",
      },
      {
        title: "Khnifiss Rmad",
        posterUrl:
          "https://i.pinimg.com/1200x/c4/7c/ba/c47cba83e7cb211b410f46ae9697b02b.jpg",
        duration: 142,
        rating: 8.8,
        showtime_count: 5,
        description:
          "Dans un village reculé du sud marocain, entre dunes de sable et traditions ancestrales, une jeune femme rebelle nommée Aicha défie les conventions sociales pour réaliser son rêve: devenir la première guide touristique féminine de sa région. Face à l'opposition de sa famille conservatrice et aux préjugés de la communauté, elle trouve refuge et inspiration dans les récits de sa grand-mère qui lui raconte les légendes oubliées du désert. Le film tisse un portrait poignant de la condition féminine dans le Maroc rural contemporain, explorant les conflits entre modernité et tradition, liberté individuelle et pression sociale. À travers de magnifiques images du désert marocain, le réalisateur nous offre une méditation sur l'identité, la transmission et le courage qu'il faut pour briser les chaînes du passé. Un drame social puissant porté par des acteurs marocains exceptionnels.",
      },
      {
        title: "Faracha",
        posterUrl: "https://www.ccm.ma/cin/phfilm/727-phFilmLm1.jpg",
        duration: 118,
        showtime_count: 4,
        rating: 9.8,
        description:
          "À Casablanca, Farah, une jeune wedding planner ambitieuse et moderne, jongle entre l'organisation de mariages somptueux et sa propre vie sentimentale chaotique. Entre clients exigeants, famille envahissante qui la presse de se marier, et ex-petit ami qui refait surface au pire moment, elle découvre que planifier le bonheur des autres est bien plus simple que construire le sien. Quand elle rencontre Mehdi, un musicien libre d'esprit qui remet en question tous ses plans soigneusement établis, Farah doit choisir entre la vie parfaite qu'elle a toujours imaginée et l'imprévisibilité de l'amour véritable. Cette comédie romantique marocaine, fraîche et contemporaine, aborde avec humour et tendresse les thèmes du mariage, de l'indépendance féminine et de la pression sociale dans le Maroc urbain d'aujourd'hui. Dialogues pétillants, situations hilarantes et personnages attachants font de Faracha un feel-good movie qui célèbre l'authenticité.",
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
