import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    confirmationCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    seatsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "CONFIRMED",
    },
  },
  {
    timestamps: true,
  }
);

export default Reservation;
