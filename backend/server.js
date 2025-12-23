import sequelize from "./config/database.js";
import express from "express";
const port = 3000;
const app = express();
app.use(express.json());
import "./models/index.js";
import filmRoutes from "./routers/filmRouters.js";
import reservationRoutes from "./routers/reservationRouters.js";

import cors from "cors";


app.use(cors());
app.use(express.json());
app.use("/film", filmRoutes);
app.use("/reservation", reservationRoutes);

sequelize
  .sync({ force: true })
  .then(() =>  console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB:", err));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
