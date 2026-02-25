// callback-pokemon.js
function getPokemonWithCallback(callback) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((data) => callback(null, data.results))
    .catch((error) => callback(error, null));
}

getPokemonWithCallback((error, pokemon) => {
  if (error) {
    console.error("Callback Error:", error.message);
  } else {
    console.log(`Callback: Got ${pokemon.length} Pokemon`);
    console.log(
      "First 151:",
      pokemon.slice(0, 151).map((p) => p.name),
    );
  }
});

module.exports = { getPokemonWithCallback };
