// async-await-pokemon.js
async function getPokemonWithAsyncAwait() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data.results;
}

async function runDemo() {
  try {
    const pokemon = await getPokemonWithAsyncAwait();
    console.log(`Async/Await: Got ${pokemon.length} Pokemon`);
    console.log(
      "First 151:",
      pokemon.slice(0, 151).map((p) => p.name),
    );
  } catch (error) {
    console.error("Async/Await Error:", error.message);
  }
}

//runDemo();

module.exports = { getPokemonWithAsyncAwait };
