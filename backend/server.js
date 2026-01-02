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
app.use("/session", sessionRoutes);
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    await seedAll();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error);
  }
;}

startServer();
