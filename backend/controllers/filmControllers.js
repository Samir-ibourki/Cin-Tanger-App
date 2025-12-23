
import Film from "../models/Film.js";

// validation test en Postman
export const createFilm = async (req, res) => {
  try {
    const { title, synopsis,duration, posterUrl } = req.body;

    const film = await Film.create({
      title, synopsis,duration, posterUrl
    });

    res.status(201).json({
      message: "Film created successfully",
      film
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  validation test en Postman 
export const getFilms = async (req, res) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  validation test en Postman 

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;

    const film = await Film.findByPk(id);

    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// validation test en Postaman

export const updatefilm = async (req, res) => {
  try {
    const { id } = req.params;

    const film = await Film.findByPk(id);
    if (!film) return res.status(404).json({ message: "Film not found" });

    await film.update(req.body);

    res.json({
      message: "Film updated successfully",
      film
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// validation Test  en Postman
export const deletefilm = async (req, res) => {
  try {
    const { id } = req.params;

    const film = await Film.findByPk(id);
    if (!film) return res.status(404).json({ message: "Film not found" });

    await film.destroy();

    res.json({ message: "Film deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
