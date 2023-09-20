const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const cliente = require("./models/cliente");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render("primeira_pagina")
});

app.get("/consulta", function (req, res) {
    cliente
      .findAll()
      .then(function (cliente) {
        res.render("consulta", { cliente });
      })
      .catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro);
      });
  });
  
  app.get("/editar/:id", function (req, res) {
    cliente
      .findAll({ where: { id: req.params.id } })
      .then(function (cliente) {
        res.render("editar", { cliente });
      })
      .catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro);
      });
  });
  
  app.get("/excluir/:id", function (req, res) {
    cliente
      .destroy({ where: { id: req.params.id } })
      .then(function () {
        res.render("primeira_pagina");
      })
      .catch(function (erro) {
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro);
      });
  });
  
  app.post("/cadastrar", function (req, res) {
    cliente
      .create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        idade: req.body.idade,
        endereco: req.body.endereco
      })
      .then(function () {
        res.redirect("/");
      })
      .catch(function (erro) {
        res.send("Falha ao cadastrar os dados: " + erro);
      });
  });
  
  app.post("/atualizar", function (req, res) {
    cliente
      .update(
        {
            nome: req.body.nome,
            telefone: req.body.telefone,
            idade: req.body.idade,
            endereco: req.body.endereco
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then(function () {
        res.redirect("/consulta");
      });
  });


app.listen(8081, function () {
    console.log("Servidor ativo!");
});
