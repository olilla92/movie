import express from "express";
import movies from "./data/movies.js";

const app = express();
app.use(express.json());

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movie not found!" });
  }
  res.status(200).json(movies[id]);
});

app.post("/movies", (req, res) => {
  const { title, director, date, oscar } = req.body;
  if (!title || !director || !date || !oscar) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const ujFilm = { title, director, date, oscar };
  movies.push(ujFilm);
  res.status(200).json(ujFilm);
});

app.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movie not found!" });
  }
  const { title, director, date, oscar } = req.body;
  if (!title || !director || !date || !oscar) {
    return res.status(400).json({ message: "Missing data!" });
  }
  res.status(200).json(movies[id])
});

app.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movie not found!" });
  }
  movies[id] = movies.slice(id, 1);
  res.status(200).json({ message: "Delete successful!" });
});

app.listen(3000, () => {
  console.log("Server runs!");
});
