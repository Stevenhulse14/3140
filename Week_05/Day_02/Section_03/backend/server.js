// Import required modules
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

// Create Express app
const app = express();
const PORT = 3000;

// Enable CORS so frontend can make requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// In-memory storage for the Pokémon team
// This array will store the team data
let team = [];

// ============================================
// API ROUTES
// ============================================

/**
 * GET /api/pokemon/:name
 * Fetches Pokémon data from PokeAPI and returns simplified information
 */
app.get('/api/pokemon/:name', async (req, res) => {
  try {
    // Get the Pokémon name from the URL parameter
    const pokemonName = req.params.name.toLowerCase();
    
    // Fetch data from PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    // If Pokémon not found, return 404
    if (!response.ok) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    
    // Parse the JSON response from PokeAPI
    const data = await response.json();
    
    // Extract and simplify the data we need
    const simplifiedData = {
      name: data.name,
      sprite: data.sprites.front_default, // Pokémon image URL
      types: data.types.map(type => type.type.name), // Array of type names
      abilities: data.abilities.map(ability => ability.ability.name) // Array of ability names
    };
    
    // Send back the simplified data
    res.json(simplifiedData);
    
  } catch (error) {
    // Handle any errors
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data' });
  }
});

/**
 * GET /api/team
 * Returns the current team array
 */
app.get('/api/team', (req, res) => {
  // Simply return the team array
  res.json(team);
});

/**
 * POST /api/team
 * Adds a Pokémon to the team
 * Body: { name: "pikachu" }
 */
app.post('/api/team', (req, res) => {
  // Get the Pokémon name from the request body
  const { name } = req.body;
  
  // Validate that name was provided
  if (!name) {
    return res.status(400).json({ error: 'Pokémon name is required' });
  }
  
  // Check if team is already full (max 6 Pokémon)
  if (team.length >= 6) {
    return res.status(400).json({ error: 'Team is full! Maximum 6 Pokémon allowed.' });
  }
  
  // Check if Pokémon is already in the team (no duplicates)
  if (team.some(pokemon => pokemon.name === name.toLowerCase())) {
    return res.status(400).json({ error: 'This Pokémon is already in your team!' });
  }
  
  // Add the Pokémon to the team
  team.push({ name: name.toLowerCase() });
  
  // Return success response with the updated team
  res.json({ message: 'Pokémon added to team!', team });
});

/**
 * DELETE /api/team/:name
 * Removes a Pokémon from the team
 */
app.delete('/api/team/:name', (req, res) => {
  // Get the Pokémon name from the URL parameter
  const pokemonName = req.params.name.toLowerCase();
  
  // Find the index of the Pokémon in the team
  const index = team.findIndex(pokemon => pokemon.name === pokemonName);
  
  // If Pokémon not found in team, return 404
  if (index === -1) {
    return res.status(404).json({ error: 'Pokémon not found in team' });
  }
  
  // Remove the Pokémon from the team array
  team.splice(index, 1);
  
  // Return success response with the updated team
  res.json({ message: 'Pokémon removed from team!', team });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available:`);
  console.log(`   GET    /api/pokemon/:name`);
  console.log(`   GET    /api/team`);
  console.log(`   POST   /api/team`);
  console.log(`   DELETE /api/team/:name`);
});
