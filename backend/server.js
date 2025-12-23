import sequelize from "./config/database.js";
import express from "express";
const port = 3000;
const app = express();
app.use(express.json());
import "./models/index.js";
import salleRoutes from "./routes/salleRoutes.js";
import sessionRoute from "./routes/sessionRoutes.js";
app.use("/api/salle", salleRoutes);
app.use("/api/session", sessionRoute);

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB:", err));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
