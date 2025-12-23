// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";
// import Session from "../models/Session.js";
// const Reservation = sequelize.define(
//   "Reservation",
//   {
//     confirmationCode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     seatsCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "CONFIRMED",
//     },
//     //  session_id: {                    
//     //   type: DataTypes.INTEGER,
//     //   allowNull: false,           
//     //   references: {               
//     //     model: Session,
//     //     key: "id",
//     //   },
//     //   onDelete: "CASCADE",       
//     // },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default Reservation;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

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
      type: DataTypes.ENUM("CONFIRMED", "CANCELLED"),
      defaultValue: "CONFIRMED",
    },

    // 🔑 Foreign Key
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sessions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "Reservations",
    timestamps: true,
  }
);

export default Reservation;
