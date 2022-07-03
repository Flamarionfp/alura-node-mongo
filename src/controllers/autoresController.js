import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    autores.findById(req.params.id, (err, Autor) => {
      if (err) {
        res.status(400).send(`Erro ao listar Autor: ${err.message}`);
      } else {
        res.status(200).json(Autor);
      }
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar cadastrar Autor: ${err.message}` });
      } else {
        res.status(201).json(autor.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const { id } = req.params;
    autores.findByIdAndUpdate(id, { $set: req.body }, (err, autor) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar atualizar Autor: ${err.message}` });
      } else {
        res.status(200).json(autor.toJSON());
      }
    });
  };

  static excluirAutor = (req, res) => {
    const { id } = req.params;
    autores.findByIdAndDelete(id, (err, Autor) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar excluir Autor: ${err.message}` });
      } else {
        res.status(200).send({ message: "Autor excluido com sucesso" });
      }
    });
  };
}

export default AutorController;
