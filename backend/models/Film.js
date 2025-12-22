import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Film = sequelize.define(
  "Film",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
export default Film;
