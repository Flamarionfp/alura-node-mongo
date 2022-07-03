import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autroresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Curso de Node");
  });

  app.use(livros, autores);
};

export default routes;
