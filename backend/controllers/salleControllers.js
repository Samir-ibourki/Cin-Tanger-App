import { Salle } from "../models/index.js";

export const createSalle = async (req, res, next) => {
  try {
    const { name, capacity } = req.body;

    if (!name || capacity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    const salle = await Salle.create({ name, capacity });
    return res.status(201).json({
      success: true,
      data: salle,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSalles = async (req, res, next) => {
  try {
    const salles = await Salle.findAll();

    res.status(200).json({
      success: true,
      count: salles.length,
      data: salles,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSalle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, capacity } = req.body;

    const salle = await Salle.findByPk(id);

    if (!salle) {
      return res.status(404).json({
        success: false,
        message: "Salle non trouvée",
      });
    }

    // si les champs sont fournis
    if (name !== undefined) salle.name = name;
    if (capacity !== undefined) salle.capacity = capacity;

    await salle.save();

    return res.status(200).json({
      success: true,
      data: salle,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSalle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salle = await Salle.findByPk(id);
    if (!salle) {
      return res.status(404).json({
        success: false,
        message: "salle non trouvee",
      });
    }
    await salle.destroy();
    return res.status(200).json({
      success: true,
      message: "Salle supprime avec success",
    });
  } catch (error) {
    next(error);
  }
};
