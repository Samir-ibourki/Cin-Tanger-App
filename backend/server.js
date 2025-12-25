import sequelize from "./config/database.js";
import express from "express";
const PORT = 3000;
const app = express();
app.use(express.json());
import "./models/index.js";

import filmRoutes from "./routes/filmRouters.js";
import reservationRoutes from "./routes/reservationRouters.js";
import cors from "cors";
import { seedAll } from "./seeders/seedAll.js";

app.use(cors());
app.use(express.json());
app.use("/film", filmRoutes);
// app.use("/reservation", reservationRoutes);
app.use("/reservation", reservationRoutes);
sequelize
sequelize.sync({ alter: true })
  .then(() =>  console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB:", err));

  app.use("/reservations", reservationRoutes);

// const startServer = async () => {
  try {
//     await sequelize.sync({ alter: true });
//     await seedAll();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error);
  }
;

startServer();
