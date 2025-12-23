import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Session = sequelize.define(
  "Session",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     
     filmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Films",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
        salleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Salles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

export default Session;
