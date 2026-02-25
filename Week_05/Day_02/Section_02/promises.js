// promise-pokemon.js
function getPokemonWithPromise() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((data) => data.results);
}

getPokemonWithPromise()
  .then((pokemon) => {
    console.log(`Promise: Got ${pokemon.length} Pokemon`);
    console.log(
      "First 151:",
      pokemon.slice(0, 151).map((p) => p.name),
    );
  })
  .catch((error) => console.error("Promise Error:", error.message));

module.exports = { getPokemonWithPromise };
