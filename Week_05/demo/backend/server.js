const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  // send pokemon data to the frontend

  try {
    const data = await fetch("https://pokeapi.co/api/v2/evolution-chain/2/");
    const pokemon = await data.json();
    res.send(pokemon);
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
  }
  //console.log(typeof {}, Array.isArray([]));
  res.json({ message: "Hello from the backend!", pokemon });
});

app.get("/login");

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
