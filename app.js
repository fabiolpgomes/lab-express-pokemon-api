const express = require("express");
//importando cors
const cors = require("cors");

let data = require("./data");

const PORT = 4000;

//instanciando o express na variável APP
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

//configurando o nosso servidor para receber e enviar arquivos em JSON
app.use(express.json()); //aceitar json

//ROTAS app + verbo http (get, delete, put, patch, post)

app.get("/pokemon", (req, res) => {
  //Trazer todos Pokemon

  return res.status(200).json(data);
});

//Buscar 1 Pokemon randomicamente
app.get("/randomPokemon", (req, res) => {
  console.log("req params", req.params);

  const result = Math.round(Math.random() * data.length);
  const onePokemon = data[result];

  return res.status(200).json(onePokemon);
});

// Buscar 1 Pokemon por nome
app.get("/pokemon/:name", (req, res) => {
  const { name } = req.params;

  const onePokemon = data.filter((pokemon) => {
    return pokemon.name == name;
  });

  return res.status(200).json(onePokemon);
});

// Adicionar 1 Pokemon
app.post("/pokemon/add", (req, res) => {
  const form = req.body;

  data.push(form);

  return res.status(201).json(data);
});

app.put("/pokemon/edit/:name", (req, res) => {
  const form = req.body;
  const { name } = req.params;

  data.forEach((pokemon, index) => {
    if (pokemon.name == name) {
      data[index] = { ...data[index], ...form };
    }
  });

  return res.status(201).json(data);
});

//Deletar 1 pokemon por nome
app.delete("/pokemon/delete", (req, res) => {
  const { name } = req.params;
});

//Buscar 1 Pokemon por Nome ou Tipo  acessar a query =>req.query
app.get("/search", (req, res) => {
  // console.log(req.query);
  // console.log(req.query.name);

  let foundPokemon = [];

  if (req.query.name) {
    console.log("Sim estao procurando por nome");

    allPokemon.forEach((pokemon) => {
      if (pokemon.name == +req.query.name) {
        foundPokemon.push(pokemon);
      }
    });
  }
  return res.status(200).json(data);
});

app.get("/search", (req, res) => {
  let foundPokemon = [];
  if (req.query.type) {
    console.log("Sim estao procurando por type");
    allPokemon.forEach((pokemon) => {
      if (pokemon.type == +req.query.type) {
        foundPokemon.push(pokemon);
      }
    });
  }
  return res.status(200).json(data);
});

// Importing all the pokemon for our data file
let allPokemon = require("./data");

// -- Define your route listeners here! --

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
