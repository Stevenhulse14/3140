// Array of Pokemon
const express = require("express");

const { getPokemonWithAsyncAwait } = require("../Section_02/asyncawait");

const server = express();

// middleware for images to be served up
server.use("/images", express.static("images"));

const PORT = 3039;
//console.log(server);
const pokemon = [
  {
    id: 1,
    name: "Pikachu",
    type: "Electric",
    hp: 35,
    image: "/images/Pikachu.png",
  },
  {
    id: 2,
    name: "Charizard",
    type: "Fire/Flying",
    hp: 78,
    image: "/images/Charizard.png",
  },
  {
    id: 3,
    name: "Blastoise",
    type: "Water",
    hp: 79,
    image: "/images/blastoise.png",
  },
];

server.get("/", (req, res) => {
  res.send(pokemon);
});

server.get("/pokemon", async (req, res) => {
  try {
    const response = await getPokemonWithAsyncAwait();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send("No Data");
  }
});

server.get("/:id", (req, res) => {
  const id = req.params.id;

  const foundPokemon = pokemon.find((p) => p.id === +id);

  res.send(`<!DOCTYPE html>

      <html>
        <head>
          <title>${foundPokemon.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              text-align: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .card {
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h1 {
              color: #333;
              text-transform: capitalize;
            }
            img {
              width: 200px;
              height: 200px;
              image-rendering: pixelated;
            }
            .info { margin: 20px 0; font-size: 18px; }
            .label { font-weight: bold; color: #667eea; }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${foundPokemon.name}</h1>
            <img src="${foundPokemon.image}" alt="${foundPokemon.name}">
            <div class="info"><span class="label">ID:</span> ${foundPokemon.id}</div>
            <div class="info"><span class="label">Type:</span> ${foundPokemon.type}</div>
            <div class="info"><span class="label">HP:</span> ${foundPokemon.hp}</div>
            <a href="/">← Back to Home</a>
          </div>
        </body>
      </html>
`);
  console.log(+id);
});

server.listen(PORT, () => {
  console.log(`Your Server is Up and running on Port ${PORT}`);
});
