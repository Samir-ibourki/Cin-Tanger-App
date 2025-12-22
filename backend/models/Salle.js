import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Salle = sequelize.define(
  "Salle",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);
export default Salle;
