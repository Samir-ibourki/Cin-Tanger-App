import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Film = sequelize.define(
  "Film",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "No description provided"
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    showtime_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Action",
    },
  },
  { timestamps: true }
);
export default Film;
