import sequelize from "./config/database.js";
import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
import "./models/index.js";

import filmRoutes from "./routes/filmRouters.js";
import reservationRoutes from "./routes/reservationRouters.js";
import salleRoutes from "./routes/salleRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from "cors";
import { seedAll } from "./seeders/seedAll.js";

app.use(cors());
app.use(express.json());
app.use("/film", filmRoutes);
app.use("/reservations", reservationRoutes);
app.use("/salle", salleRoutes);
app.use("/sessions", sessionRoutes);

// Health check and root route
app.get("/", (req, res) => res.send("CinéTanger API is running!"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

const startServer = async () => {
  app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    try {
      await sequelize.sync({ alter: true });
      await seedAll();
      console.log("Database synced and seeded!");
    } catch (error) {
      console.error("Database initialization error:", error);
    }
  });
};

startServer();
