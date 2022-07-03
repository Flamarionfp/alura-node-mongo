import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    livros
      .findById(req.params.id)
      .populate("autor", "nome")
      .exec((err, livro) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(livro);
        }
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro.save((err, livro) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar cadastrar livro: ${err.message}` });
      } else {
        res.status(201).json(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const { id } = req.params;
    livros.findByIdAndUpdate(id, { $set: req.body }, (err, livro) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar atualizar livro: ${err.message}` });
      } else {
        res.status(200).json(livro);
      }
    });
  };

  static excluirLivro = (req, res) => {
    const { id } = req.params;
    livros.findByIdAndDelete(id, (err, livro) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Erro ao tentar excluir livro: ${err.message}` });
      } else {
        res.status(200).send({ message: "Livro excluido com sucesso" });
      }
    });
  };

  static buscarLivro = (req, res) => {
    const { campo, value } = req.query;
    let search = { [campo]: value };
    livros.find(search, {}, (err, livro) => {
      console.log("livro", livro);
      res.status(200).send(livro);
    });
  };
}

export default LivroController;
