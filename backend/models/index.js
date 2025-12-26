import Film from "./Film.js";
import Salle from "./Salle.js";
import Session from "./Session.js";
import Reservation from "./Reservation.js";

Film.hasMany(Session, { foreignKey: "filmId", onDelete: "CASCADE" });
Session.belongsTo(Film, { foreignKey: "filmId" });

Salle.hasMany(Session, { foreignKey: "salleId", onDelete: "CASCADE" });
Session.belongsTo(Salle, { foreignKey: "salleId" });

Session.hasMany(Reservation, {
  foreignKey: "sessionId",
  as: "reservations",
});

Reservation.belongsTo(Session, {
  foreignKey: "sessionId",
  as: "session",
});
export { Film, Salle, Session, Reservation };
